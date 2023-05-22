<?php
require_once 'autoloader.php';
require_once 'vendor/autoload.php';

$loader = new \Twig\Loader\FilesystemLoader($_SERVER['DOCUMENT_ROOT']);
$twig = new \Twig\Environment($loader);

echo $twig->render('form.twig');

//error_reporting(0);

$isf = (float)$_POST['isf'];
$cr = (float)$_POST['cr'];

if ($isf && $cr) {
    $bolusHistory = [];
    $timeArray = [];

    $carbs = range(20, 60);
    $myOpenBoluses = [];

    $bolus = new \Bolus\Bolus();
    foreach ($carbs as $mealCarbs) {
        $r = $bolus->calculateBolus($mealCarbs);
        $myOpenBoluses[$mealCarbs] = $r;
    }

    $oref0insulinData = [];
    foreach ($carbs as $meal) {
        writeNewMealValue($meal);
        $command1 = 'cd ' . $_SERVER['DOCUMENT_ROOT'] . 'oref0/examples';
        $command2 = 'node ../bin/oref0-determine-basal.js iob.json temp_basal.json glucose.json profile.json --meal meal.json --currentTime "2019-04-18T09:30:00+03:00" > suggest.json';
        $command = "$command1 && $command2";
        $output2 = shell_exec($command);
        $bolusOref0 = $meal / 12 + getNewInsulinReqValue();
        $insulinData[$meal] = $bolusOref0;
    }

    echo $twig->render('index.twig', [
        'boluses' => $myOpenBoluses,
        'anotherData' => $insulinData,
        'integralSumm' => \Utils\IntegralAssessment::calculateIntegral($myOpenBoluses, $insulinData),
    ]);
}

function writeNewMealValue($mealValue)
{
    $jsonFile = $_SERVER['DOCUMENT_ROOT'] . 'oref0/examples/meal.json';
    $jsonData = file_get_contents($jsonFile);
    $data = json_decode($jsonData, true);
    $data['carbs'] = $mealValue;
    $newJsonData = json_encode($data);
    file_put_contents($jsonFile, $newJsonData);
}

function getNewInsulinReqValue()
{
    $jsonFile = $_SERVER['DOCUMENT_ROOT'] . 'oref0/examples/suggest.json';
    $jsonData = file_get_contents($jsonFile);
    $data = json_decode($jsonData, true);
    return $data['insulinReq'];
}