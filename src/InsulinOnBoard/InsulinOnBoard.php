<?php

namespace InsulinOnBoard;

use Profile\ProfileEnum;
use Utils\JsonDataHelper;

class InsulinOnBoard
{
    private int $insulinOnBoard;
    private InsulinOnBoardHelper $helper;

    public function __construct()
    {
        $this->helper = new InsulinOnBoardHelper();
        $this->calculateInsulinOnBoard();
    }

    public function calculateInsulinOnBoard(): void
    {
        $t = []; // время
        $util = new JsonDataHelper();
        $boluses = $util->getBoluses();
        //$basals = $util->getBasals();

        //$this->insulinOnBoard = $this->calculateInsulinOnBoardBolus($boluses, $t) + $this->calculateInsulinOnBoardBasal($basals ,$t);
    }

    public function getInsulinOnBoard(): int
    {
        return $this->calculateInsulinOnBoardBolus() + $this->calculateInsulinOnBoardBasal();
    }

    public function calculateInsulinOnBoardBolus(): float
    {
        $insulinOnBoardBolus = 0;

        $jsonDataHelper = new JsonDataHelper();
        $boluses = $jsonDataHelper->getBoluses();

        foreach ($boluses as $bolus) {
            $time['afterBolus'] = 1;
            $time['dia'] = 3 * 60;

            $time['peakTime'] = ProfileEnum::INSULIN_PEAK_TIME;
            $insulinOnBoardBolus += $this->calculateInsulinOnBoardContribution($bolus['amount'], $time);
        }

        return $insulinOnBoardBolus;
    }

    /**
     * @throws \JsonException
     */
    public function calculateInsulinOnBoardBasal(): float
    {
        $insulinOnBoardBasal = 0;
        $jsonDataHelper = new JsonDataHelper();
        $tempBasalRates = $jsonDataHelper->getBasalsWithDuration();
        $profileBasalRates = $this->helper->getBasalRatesFromProfile();

        foreach ($tempBasalRates as $tempBasalRate) {
            $time['afterBolus'] = strtotime($tempBasalRate['basalRate']['timestamp']) -
                $jsonDataHelper->getLastBolusTime(strtotime($tempBasalRate['basalRate']['timestamp']))
            ;
            $time['dia'] = $tempBasalRate['basalDuration']['duration (min)'];

            $time['peakTime'] = ProfileEnum::INSULIN_PEAK_TIME;

            foreach ($profileBasalRates as $basalRate) {
                if ($basalRate['minutes'] === 0) {
                    continue;
                }
                $b = ($tempBasalRate['basalRate']['rate'] - $basalRate['rate']) * 5 / $basalRate['minutes'];
                $insulinOnBoardBasal += $this->calculateInsulinOnBoardContribution($b , $time);
            }
        }

        return $insulinOnBoardBasal;
    }

    public function calculateInsulinOnBoardActivityTotal($time): float
    {
        $insulinOnBoardActivity = 0;

        $basals = $this->helper->getBoluses(); // затычка тут получаем базали, time - ассоциативный массив с разными данными
        //берем по профилю

        foreach ($basals as $basal) {
            $insulinOnBoardActivity += $this->calculateInsulinOnBoardActivity($basal, $time);
        }

        return $insulinOnBoardActivity;
    }

    private function calculateInsulinOnBoardActivity($basal, $time): float
    {
        $t = $time['afterBolus']; // time after bolus
        $tp = $time['peakTime']; // peak time
        $td = $time['dia']; // duration of insulin action
        $tau = $this->helper->getTau($tp, $td);
        $a = $this->helper->getA($tau, $td);
        $s = $this->helper->getS($a, $tp, $tau);

        return $basal * $s / ($tau ** 2) * $t (1 - $t / $td) * 2.7 ** -$t / $tau;
    }

    private function calculateInsulinOnBoardContribution($b, $time): float
    {

        $t = $time['afterBolus'] / 60; // time after bolus
        $tp = $time['peakTime']; // peak time
        $td = $time['dia']; // duration of insulin action
        $tau = $this->helper->getTau($tp, $td);
        $a = $this->helper->getA($tau, $td);
        $s = $this->helper->getS($a, $tp, $tau);

        if ($tau == 0 || $a == 0 || $s == 0) {
            return 0;
        }

        return $b * (1 - $s * (1 - $a) * (($t * $t / ($tau * $td * (1 - $a)) - $t / $tau - 1) *
                    (2.7 ** (-$t / $tau)) + 1));
    }
}