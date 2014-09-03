'use strict';

angular.module('viking.ctrl')
    .controller('HomeCtrl',
    ['$scope', '$socket', function ($scope, $socket) {
        $scope.loading = false;

        $scope.keywords0 = '';
        $scope.keywords1 = '';

        var keywords0ClientId = '';
        var keywords0ServerId = '';
        $scope.stats0 = null;

        var keywords1ClientId = '';
        var keywords1ServerId = '';
        $scope.stats1 = null;

        $socket.on('front-request', function (data) {
            console.log(data);
            if (keywords0ClientId === data.clientId) {
                keywords0ServerId = data.serverId;
            } else if (keywords1ClientId === data.clientId) {
                keywords1ServerId = data.serverId;
            }
        });

        $socket.on('front-response', function (data) {
            console.log(data);
            if (data.id === keywords0ServerId) {
                $scope.stats0 = data;
                $scope.stats0ChartConfig.series[0].data[0][1] = $scope.stats0.positive;
                $scope.stats0ChartConfig.series[0].data[1][1] = $scope.stats0.neutral;
                $scope.stats0ChartConfig.series[0].data[2][1] = $scope.stats0.negative;
            } else if (data.id === keywords1ServerId) {
                $scope.stats1 = data;
                $scope.stats1ChartConfig.series[0].data[0][1] = $scope.stats1.positive;
                $scope.stats1ChartConfig.series[0].data[1][1] = $scope.stats1.neutral;
                $scope.stats1ChartConfig.series[0].data[2][1] = $scope.stats1.negative;
            }
            if ($scope.loading) {
                $scope.loading = false;
            }
        });

        $scope.sendKeywords0 = function () {
            if ($scope.keywords0.length > 0) {
                keywords0ClientId = new Date().getTime();
                var message = {
                    keywords: $scope.keywords0.split(' '),
                    clientId: keywords0ClientId
                };
                $socket.emit('front-request', message);
            }
            if (!$scope.loading) {
                $scope.loading = true;
            }
        };

        $scope.sendKeywords1 = function () {
            if ($scope.keywords1.length > 0) {
                keywords1ClientId = new Date().getTime();
                var message = {
                    keywords: $scope.keywords1.split(' '),
                    clientId: keywords1ClientId
                };
                $socket.emit('front-request', message);
            }
            if (!$scope.loading) {
                $scope.loading = true;
            }
        };

        $scope.stats0ChartConfig = {
            options: {
                chart: {
                    backgroundColor: '#8e44ad',
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false
                },
                title: {
                    text: ''
                },
                legend: {
                    itemStyle: {
                        font: '1em Roboto, sans-serif',
                        color: 'white'
                    }
                },
                plotOptions: {
                    pie: {
                        colors: ['#2ecc71', '#f1c40f', '#e74c3c'],
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: false
                        },
                        showInLegend: true
                    }
                }
            },
            series: [
                {
                    type: 'pie',
                    data: [
                        ['positive', 0],
                        ['neutral', 0],
                        ['negative', 0]
                    ]
                }
            ]
        };

        $scope.stats1ChartConfig = {
            options: {
                chart: {
                    backgroundColor: '#8e44ad',
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false
                },
                title: {
                    text: ''
                },
                legend: {
                    itemStyle: {
                        font: '1em Roboto, sans-serif',
                        color: 'white'
                    }
                },
                plotOptions: {
                    pie: {
                        colors: ['#27ae60', '#f39c12', '#c0392b'],
                        dataLabels: {
                            enabled: false
                        },
                        showInLegend: true
                    }
                }
            },
            series: [
                {
                    type: 'pie',
                    data: [
                        ['positive', 0],
                        ['neutral', 0],
                        ['negative', 0]
                    ]
                }
            ]
        };
    }]
);