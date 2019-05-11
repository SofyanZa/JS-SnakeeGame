<?php



class ErrorController extends CoreController
{
    public function page404()
    {
        // Statut de la réponse HTTP
        http_response_code(404);
        // Equivaut à : header('HTTP/1.1 404 Not Found');

        $this->show('404');
    }
}
