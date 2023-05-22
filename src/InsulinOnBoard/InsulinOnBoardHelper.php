<?php

namespace InsulinOnBoard;

use Profile\ProfileEnum;

class InsulinOnBoardHelper
{
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

    public function getBasals(): array
    {
        return []; //settings basal pumphistory.json сделать базали
    }

    public function getBasalRatesFromProfile(): array
    {
        $data = file_get_contents(ProfileEnum::PATH . '../../examples/dev-bi/profile.json');
        return json_decode($data, true, 512, JSON_THROW_ON_ERROR)['basalprofile'];
    }

    public function getTempBasalRates():array
    {
        $data = file_get_contents(ProfileEnum::PATH . '../../examples/dev-bi/profile.json');
        try {
            return json_decode($data, true, 512, JSON_THROW_ON_ERROR);
        } catch (\JsonException $e) {
            print_r('hellofromkazan');
        }
        return [];
    }

}