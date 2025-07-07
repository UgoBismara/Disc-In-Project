<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Anti-spam : honeypot caché (optionnel si tu veux le rajouter dans le formulaire)
    if (!empty($_POST['website'])) {
        echo "Spam detected.";
        exit;
    }

    // Récupération des champs
    $anonymous = isset($_POST['anonymous']);
    $name = $anonymous ? "Anonymous" : htmlspecialchars(trim($_POST['name']));
    $contact = htmlspecialchars(trim($_POST['contact']));
    $description = htmlspecialchars(trim($_POST['description']));
    $followup = htmlspecialchars(trim($_POST['followup']));

    // Validation minimale
    if (empty($description) || empty($followup)) {
        echo "Please fill in all required fields.";
        exit;
    }

    // Préparer l'e-mail
    $to = "gavilleto@gmail.com";  // <-- À modifier si besoin
    $subject = "New Safe-Team Report (DiscIn.eu)";

    $emailContent = "Name: $name\n";
    $emailContent .= "Contact (Email/Phone): " . ($contact ?: "Not provided") . "\n\n";
    $emailContent .= "Situation Description:\n$description\n\n";

    $emailContent .= "Follow-up Preference:\n";
    switch ($followup) {
        case "contact_me":
            $emailContent .= "Contact me first, I need to share\n";
            break;
        case "talk_to_person":
            $emailContent .= "You can talk directly to the involved person\n";
            break;
        case "decide":
            $emailContent .= "I don't know yet, I prefer if you decide\n";
            break;
        default:
            $emailContent .= "Not specified\n";
    }

    $headers = "From: ultimate.discin@gmail.com\r\n";
    if (!empty($contact)) {
        $headers .= "Reply-To: $contact\r\n";
    }

    // Envoi
    if (mail($to, $subject, $emailContent, $headers)) {
        echo "Your report has been successfully sent.";
    } else {
        echo "An error occurred while sending your report.";
    }
} else {
    echo "Invalid request method.";
}
?>
