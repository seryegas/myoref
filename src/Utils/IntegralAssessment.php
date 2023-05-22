<?php

namespace Utils;

class IntegralAssessment
{
    public static function calculateIntegral($curve1, $curve2):float
    {
        $integralSumm = 0;

        $xsesCurve1 = array_keys($curve1);
        $xsesCurve2 = array_keys($curve2);

        foreach ($xsesCurve1 as $i => $x) {
            $y1 = $curve1[$x];
            $y2 = $curve1[$xsesCurve1[$i + 1]];

            $y3 = $curve2[$x];
            $y4 = $curve2[$xsesCurve2[$i + 1]];

            // Вычисляем разницу между y координатами
            $difference = abs(($y1 + $y2) / 2 - ($y3 + $y4) / 2);

            // Добавляем разницу к интегральной оценке
            $integralSumm += $difference;
        }

        return $integralSumm;
    }
}