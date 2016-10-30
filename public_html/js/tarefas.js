var app = angular.module('listaTarefasApp', []);

app.controller('TarefasController', function ($scope, TarefasService) {
    $scope.tarefa = '';
    $scope.tarefas = [];

    listar();

    function listar() {
        TarefasService.listar().then(function (resposta) {
            $scope.tarefas = resposta.data;
        });
    }

    $scope.adicionar = function () {
        var tarefa = {
            descricao: $scope.tarefa,
            concluida: false
        };
        TarefasService.adicionar(tarefa).then(listar);
        $scope.tarefa = '';
    };

    $scope.concluir = function (tarefa) {
        TarefasService.concluir(tarefa).then(listar);
    };
});

app.service('TarefasService', function ($http) {
    var tarefas = [];
    var api = 'http://localhost:3000/tarefas';

    this.listar = function () {
        return $http.get(api);
    };

    this.adicionar = function (tarefa) {
        return $http.post(api, tarefa);
    };

    this.concluir = function (tarefa) {
        tarefa.concluida = !tarefa.concluida;
        return $http.put(api + '/' + tarefa.id, tarefa);
    };
});