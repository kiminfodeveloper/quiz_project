<?php
// Recebe os dados JSON do JavaScript
$json = file_get_contents('php://input');
$data = json_decode($json, true);

if ($data) {
    // Extrai os valores dos campos
    $name = $data['name'];
    $email = $data['email'];
    $phone = $data['phone'];

    // Nome do arquivo JSON onde os leads serão armazenados
    $file = 'leads.json';

    // Verifica se o arquivo já existe
    if (file_exists($file)) {
        // Lê o conteúdo existente do arquivo
        $leads = file_get_contents($file);
        // Decodifica o JSON existente em um array
        $leadsArray = json_decode($leads, true);
    } else {
        // Se o arquivo não existir, cria um array vazio
        $leadsArray = [];
    }

    // Adiciona os novos dados ao array
    $leadsArray[] = [
        'name' => $name,
        'email' => $email,
        'phone' => $phone
    ];

    // Codifica o array atualizado de volta para JSON
    $jsonLeads = json_encode($leadsArray, JSON_PRETTY_PRINT);

    // Salva o JSON atualizado no arquivo leads.json
    if (file_put_contents($file, $jsonLeads)) {
        // Retorna uma resposta JSON de sucesso
        echo json_encode([
            'status' => 'success',
            'message' => 'Form data saved successfully'
        ]);
    } else {
        // Retorna uma resposta JSON de erro
        echo json_encode([
            'status' => 'error',
            'message' => 'Failed to save data'
        ]);
    }
} else {
    // Resposta JSON se nenhum dado foi recebido
    echo json_encode([
        'status' => 'error',
        'message' => 'No data received'
    ]);
}
?>

