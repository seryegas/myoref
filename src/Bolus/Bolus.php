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
    public function calculateBolus($expectedCarbs): float
    {
        $carbsOnBoard = (new CarbsOnBoard())->getCarbsOnBoard();
        $insulinOnBoard = (new InsulinOnBoard())->getInsulinOnBoard();

        $bolus =  $expectedCarbs / ProfileEnum::CR +
            $this->helper->calculateDifferenceBetweenCurrentAndExpectedGlycemia() / ProfileEnum::ISF
            + $carbsOnBoard / ProfileEnum::CR - $insulinOnBoard;

        return $bolus;
    }

    public function getBolus(): float
    {
        return $this->bolus;
    }
}