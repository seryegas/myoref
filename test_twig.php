<?php

require_once 'autoloader.php';
require_once 'vendor/autoload.php';



//$loader = new \Twig\Loader\FilesystemLoader(\Profile\ProfileEnum::PATH);
//$twig = new \Twig\Environment($loader);

$oref0insulinData = [];
foreach (range(20, 120) as $meal) {
    writeNewMealValue($meal);
    $command1 = 'cd /mnt/c/OpenServer/domains/d/oref0/examples';
    $command2 = 'node ../bin/oref0-determine-basal.js iob.json temp_basal.json glucose.json profile.json --meal meal.json --currentTime "2019-04-18T09:30:00+03:00" > suggest.json';
    $command = "$command1 && $command2";
    $output2 = shell_exec($command);
    $bolusOref0 = $meal / 12 + getNewInsulinReqValue();
    $insulinData[$meal] = $bolusOref0;
}
$json = json_encode($insulinData);
file_put_contents('/mnt/c/OpenServer/domains/d/oref0/examples/bebringho.json', $json);



function writeNewMealValue($mealValue)
{
    $jsonFile = '/mnt/c/OpenServer/domains/d/oref0/examples/meal.json';
    $jsonData = file_get_contents($jsonFile);
    $data = json_decode($jsonData, true);
    $data['carbs'] = $mealValue;
    $newJsonData = json_encode($data);
    file_put_contents($jsonFile, $newJsonData);
}

function getNewInsulinReqValue()
{
    $jsonFile = '/mnt/c/OpenServer/domains/d/oref0/examples/suggest.json';
    $jsonData = file_get_contents($jsonFile);
    $data = json_decode($jsonData, true);
    return $data['insulinReq'];
}