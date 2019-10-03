<?php
if (!empty($_POST) && array_key_exists('input', $_POST)) {
    doIt();
} elseif (!empty($_POST)) {
    $arr = [];
    $arr[sum] = array_sum($_POST);
    echo  json_encode($arr);
}

function doIt()
{
    $res = [];
    arsort($_POST['data']);
    
    if ($_POST['input']> 31 || $_POST['input'] < 0) {
        echo 'Введено число с запредельным значением!';
        die;
    } elseif ((int)$_POST['input'] != $_POST['input']) {
        echo 'Введено число с нецелочисленным значением!';
        die; 
    }
    $balance = $_POST['input'];
    foreach ($_POST['data'] as $animal => $value) {
        if ($value <= $balance && $balance > 0) {
            array_push($res,$animal);
            $balance -= $value;
        }
    }
    echo  json_encode($res);
}
