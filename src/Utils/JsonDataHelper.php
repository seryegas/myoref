<?php

namespace Utils;

use JsonException;
use Profile\ProfileEnum;

class JsonDataHelper
{

    public function __construct()
    {

    }

    /**
     * Выбирает из файла pumphistory.json данные о всех болюсах за последние 24 часа
     * @return array
     * @throws JsonException
     */
    public function getBoluses(): array
    {
        $pumpHistoryData = file_get_contents($_SERVER['DOCUMENT_ROOT'] . '/examples/myopenaps_ssv/settings/pumphistory-24h-zoned.json');
        $allData = json_decode($pumpHistoryData, true, 512, JSON_THROW_ON_ERROR);

        $boluses = [];

        foreach ($allData as $record) {
            if ($record['_type'] === 'Bolus') {
                $boluses[] = $record;
            }
        }
        return $boluses;
    }

    /**
     * Выбирает из файла pumphistory.json данные о всех введенных базалях и их длительности за последние 24 часа
     * @return array
     * @throws JsonException
     */
    public function getBasalsWithDuration(): array
    {
        $pumpHistoryData = file_get_contents($_SERVER['DOCUMENT_ROOT'] . '/examples/dev-bi/pumphistory.json');
        $allData = json_decode($pumpHistoryData, true, 512, JSON_THROW_ON_ERROR);

        $basales = [];

        foreach ($allData as $record) {
            if ($record['_type'] === 'TempBasal') {
                $basales[] = $record;
                unset($record);
            }
        }

        $basalDurations = [];

        foreach ($allData as $record) {
            if ($record['_type'] === 'TempBasalDuration') {
                $basalDurations[] = $record;
                unset($record);
            }
        }

        $tempBasalesWithDuration = [];

        foreach ($basales as $basal) {
            foreach ($basalDurations as $durationRecord) {
                if ($basal['timestamp'] === $durationRecord['timestamp']) {
                    $tempBasalesWithDuration[$basal['timestamp']] = ['basalRate' => $basal, 'basalDuration' => $durationRecord];
                }
            }
        }

        return $tempBasalesWithDuration;
    }

    public function getLastBolusTime($currentTime)
    {
        $pumpHistoryData = file_get_contents($_SERVER['DOCUMENT_ROOT'] . '/examples/dev-bi/pumphistory.json');
        $allData = json_decode($pumpHistoryData, true, 512, JSON_THROW_ON_ERROR);

        foreach ($allData as $record) {
            if (($record['_type'] === 'Bolus') && strtotime($record['timestamp']) < $currentTime) {
                return strtotime($record['timestamp']);
            }
        }

        return false;
    }
}