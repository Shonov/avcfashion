<?php
header('Access-Control-Allow-Origin: *');

$subjects = [
    'Free consultation' => '/',
    'Learn more about AVC' => '/our_services',
    'Feed back' => '/contact_us',
    'Atelier' => '/atelier',
    'Tailoring service available in Bahrain' => '/free-appointment',
    'Tailor service inquiry' => '/tailoring-services',
];

$bodyData = $_POST['form_data'];

$subject = array_search($bodyData['url'], $subjects, true);
$to = 'avcfashionconsultancy@gmail.com, admanager@digitalfalcon.ae';

$headers = 'From: AVC Fashion Design Consultancy <info@avcfashion.com>' . "\r\n" .
    'Content-type: text/html; charset=utf-8' . "\r\n" .
    'MIME-Version: 1.0' . "\r\n" .
    'X-Mailer: PHP/' . phpversion() . "\r\n";

$body = '';

foreach ($bodyData as $key => $value) {
    if ($key === 'url') {
        continue;
    }

    if ($key === 'utm') {
        $body .= ucwords($key) . ': ' . '<br>';
        foreach ($value as $tagName => $tag) {
            $body .= '&nbsp;' . $tagName . ': ' . $tag . '<br>';
        }
    } else {
        $body .= ucwords($key) . ': ' . $value . '<br>';
    }
}

$success = mail($to, $subject, $body, $headers);
echo $success;
if (!$success) {
    echo 'Message could not be sent.';
    echo 'Mailer Error: ' . error_get_last()['message'];
} else {
    echo 'Ok';
}
