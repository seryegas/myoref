<?php

namespace CarbsOnBoard;

use Profile\ProfileEnum;

class CarbsOnBoard
{
    private float $carbsOnBoard;
    private CarbsOnBoardHelper $helper;

    public function __construct()
    {
        $this->helper = new CarbsOnBoardHelper();
        $this->data = $this->helper->getCarbs();
        $this->glucose = $this->helper->getGlucoseData();
    }

    public function calculateCarbsOnBoard(): void
    {
        $carbsFromMeals = 0;
        $carbsAbsorbedTotal = 0;

        if (count($this->data) === 1) {
            if ($this->data['carbs']) {
                $carbsFromMeals = $this->data['carbs'];
            }
        } else {
            foreach ($this->data as $meal) {
                if ($meal['carbs']) {
                    $carbsFromMeals += $meal['carbs'];
                }
            }
        }

        for ($i = 0, $iMax = count($this->glucose); $i < $iMax - 1; $i++) {
            $carbsAbsorbedTotal += $this->getCarbsAbsorbed($this->glucose[$i], $this->glucose[$i + 1]);
        }

        $this->carbsOnBoard = $carbsFromMeals - $carbsAbsorbedTotal;
    }

    public function getCarbsOnBoard(): float
    {
        $this->calculateCarbsOnBoard();
        return $this->carbsOnBoard;
    }

    private function getCarbsAbsorbed($record, $fiveMinutesBeforeRecord): float
    {
        return $this->calculateDifferenceBetweenRealAndExpectedInsulinImpact($record, $fiveMinutesBeforeRecord)
            * ProfileEnum::CR / ProfileEnum::ISF;
    }
    private function calculateDifferenceBetweenRealAndExpectedInsulinImpact($first, $second): float
    {
        return $first["glucose"] - $second["glucose"] - $this->helper->getInsulinOnBoardActivity(strtotime($first["dateString"]) + 3 * 60 * 60) * ProfileEnum::ISF * 5;
    }

    private function getGlycemiaChange(): float
    {
        return $this->helper->getGlycemiaDelta();
    }

    private function calculateCarbRatio($data): float
    {
        return $data['carbs'] / $data['insulin'];
    }
}