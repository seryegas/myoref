<?php

namespace Bolus;

use CarbsOnBoard\CarbsOnBoard;
use InsulinOnBoard\InsulinOnBoard;
use Profile\ProfileEnum;

class Bolus
{
    private float $bolus;
    private BolusHelper $helper;

    public function __construct()
    {
        $this->helper = new BolusHelper();
    }

    /**
     * @throws \JsonException
     */
    public function calculateBolus($expectedCarbs, $cr, $isf): float
    {
        $carbsOnBoard = (new CarbsOnBoard())->getCarbsOnBoard($cr, $isf);
        $insulinOnBoard = (new InsulinOnBoard())->getInsulinOnBoard();

        //var_dump($expectedCarbs, $this->helper->calculateDifferenceBetweenCurrentAndExpectedGlycemia(), $carbsOnBoard, $insulinOnBoard);die;

        $bolus =  $expectedCarbs / $cr +
            $this->helper->calculateDifferenceBetweenCurrentAndExpectedGlycemia() / $isf
            + $carbsOnBoard / $cr - $insulinOnBoard;

        return $bolus;
    }

    public function getBolus(): float
    {
        return $this->bolus;
    }
}