<?php

namespace CarbsOnBoard;

use DateInterval;
use InsulinOnBoard\InsulinOnBoard;
use JsonException;
use Profile\ProfileEnum;

class CarbsOnBoardHelper
{
    /**
     * Читает examples/autotune.json файл и взяв время clock.json находим нужные записи о глюкозе
     * @throws JsonException
     * @throws \Exception
     */
    public function getGlycemiaDelta(): float
    {
        $data = file_get_contents($_SERVER['DOCUMENT_ROOT'] . '/examples/clock.json');
        $autotuneData = file_get_contents($_SERVER['DOCUMENT_ROOT'] . '/examples/autotune.json');
        $currentTime = json_decode($data, true, 512, JSON_THROW_ON_ERROR)['currentTime'];
        $autotuneDataInPHPForm = json_decode($autotuneData,true, 512, JSON_THROW_ON_ERROR);

        $dateTime = new \DateTime($currentTime);
        $dateTime->sub(new DateInterval('PT5M')); // минус 5 минут

        $cfgRecordCurrentTime = null;
        $cfgRecordCurrentTimeMinusFiveMinutes = null;

        foreach ($autotuneDataInPHPForm['CSFGlucoseData'] as $record) {
            if ($record['dateString'] === $dateTime->format('Y-m-d\TH:i:sP')) {
                $cfgRecordCurrentTimeMinusFiveMinutes = $record;
                continue;
            }
            if ($record['dateString'] === $currentTime) {
                $cfgRecordCurrentTime = $record;
                break;
            }
        }

        return $cfgRecordCurrentTime['glucose'] - $cfgRecordCurrentTimeMinusFiveMinutes['glucose'];
    }

    public function getInsulinOnBoardActivity($time): float
    {
        return $this->calculateInsulinOnBoardActivityTotal($time);
    }

    /**
     * @throws JsonException
     */
    public function getCarbs(): array
    {
        $data = file_get_contents($_SERVER['DOCUMENT_ROOT'] . '/examples/dev-bi/carbhistory.json');
        return json_decode($data, true, 512, JSON_THROW_ON_ERROR);
    }

    public function calculateInsulinOnBoardActivityTotal($timestamp)
    {
        $insulinOnBoardActivity = 0;

        $boluses = $this->getBolusesFromCarbHistory($timestamp);

        foreach ($boluses as $bolus) {
            $time['afterBolus'] = $timestamp - strtotime($bolus['timestamp']);
            $time['dia'] = 3 * 60;
            $time['peakTime'] = ProfileEnum::INSULIN_PEAK_TIME;

            $insulinOnBoardActivity += $this->calculateInsulinOnBoardActivity($bolus["amount"], $time);
        }


        return $insulinOnBoardActivity;
    }

    public function getBolusesFromCarbHistory($timestamp): array
    {
        $data = file_get_contents($_SERVER['DOCUMENT_ROOT'] . '/examples/dev-bi/carbhistory.json');
        $phpArray =  json_decode($data, true, 512, JSON_THROW_ON_ERROR);
        $carbHistoryBoluses = [];

        foreach ($phpArray as $record)
        {
            if (isset($record["bolus"]) && strtotime($record['bolus']["timestamp"]) < $timestamp) {
                $carbHistoryBoluses[] = $record["bolus"];
            }
        }

        return $carbHistoryBoluses;
    }

    private function calculateInsulinOnBoardActivity($b, $time): float
    {
        $t = $time['afterBolus'] / 60; // time after bolus
        $tp = $time['peakTime']; // peak time
        $td = $time['dia']; // duration of insulin action
        $tau = $this->getTau($tp, $td);
        $a = $this->getA($tau, $td);
        $s = $this->getS($a, $tp, $tau);

        if ($tau == 0 || $a == 0 || $s == 0) {
            return 0;
        }
        return $b * $s / ($tau ** 2) * $t * (1 - $t / $td) * 2.7 ** (-$t / $tau);
    }

    public function getTau($peakTime, $timeOfInsulinActionDuration): float
    {
        if ($timeOfInsulinActionDuration === 0 || $peakTime / $timeOfInsulinActionDuration === 0.5)
        {
            return 0;
        }
        return $peakTime * (1 - $peakTime / $timeOfInsulinActionDuration)
            / (1 - 2 * $peakTime / $timeOfInsulinActionDuration);
    }

    public function getA($tau, $timeOfInsulinActionDuration): float
    {
        if ($timeOfInsulinActionDuration === 0) {
            return 0;
        }
        return 2 * $tau / $timeOfInsulinActionDuration;
    }

    public function getS($a, $peakTime, $tau): float
    {
        if ($a === 0 || $tau === 0 || abs(1 - $a + (1 + $a) * 2.7 ** (-$peakTime / $tau)) < 1e-6)
        {
            return 0;
        }
        return 1 / (1 - $a + (1 + $a) * 2.7 ** (-$peakTime / $tau));
    }

    public function getGlucoseData(): array
    {
        $data = file_get_contents($_SERVER['DOCUMENT_ROOT'] . '/examples/dev-bi/glucose.json');
        return json_decode($data, true, 512, JSON_THROW_ON_ERROR);
    }
}