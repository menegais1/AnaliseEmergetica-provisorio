Number.prototype.formatMoney = function (decPlaces, thouSeparator, decSeparator) {
    var n = this,
            decPlaces = isNaN(decPlaces = Math.abs(decPlaces)) ? 2 : decPlaces,
            decSeparator = decSeparator == undefined ? "." : decSeparator,
            thouSeparator = thouSeparator == undefined ? "," : thouSeparator,
            sign = n < 0 ? "-" : "",
            i = parseInt(n = Math.abs(+n || 0).toFixed(decPlaces)) + "",
            j = (j = i.length) > 3 ? j % 3 : 0;
    return sign + (j ? i.substr(0, j) + thouSeparator : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thouSeparator) + (decPlaces ? decSeparator + Math.abs(n - i).toFixed(decPlaces).slice(2) : "");
};

function round(value, decimals) {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals).toFixed(decimals);
}


function lv1p2(area) {

    $("[type=submit]").prop("disabled", true);
    $("#calcular").click(function () {

        if (validarForm()) {
            var x = document.getElementsByClassName("form-control");
            var totalm = 0;
            var totalf = 0;
            var totalcria = 0;
            var total = 0;
            var lotacaomedia = 0;
            var valor = 0;
            var ua = 0;
            for (i = 0; i < x.length; i++) {
                valor = x[i].value.replace(/\./g, "");
                if (i === 1 || i === 3 || (i >= 5 && i <= 7)) {

                    totalm += parseFloat(valor);
                }

                if ((i === 0 || i === 2 || i === 4) || (i >= 8 && i <= 10)) {
                    totalf += parseFloat(valor);
                }

                if (i === 0 || i === 4) {
                    ua = ua + parseFloat(valor) * 1;
                }

                if (i === 1 || i === 2) {
                    ua = ua + parseFloat(valor) * 0.4;
                }

                if (i === 3) {
                    ua = ua + parseFloat(valor) * 1.5;
                }

                if (i === 5 || i === 8) {
                    ua = ua + parseFloat(valor) * 0.6;
                }

                if (i === 6 || i === 9 || i === 7) {
                    ua = ua + parseFloat(valor) * 0.8;
                }



                if (i <= 4) {
                    totalcria += parseFloat(valor);
                }
                total += parseFloat(valor);

            }

            if (area === 0) {
                lotacaomedia = 0;
                ua = 0;
            } else {
                lotacaomedia = total / parseFloat(area);
                ua = ua / area;
            }
            $("#lotacaocalculo").fadeIn(3000, "linear");
            document.getElementById("lotacaocalculo").innerHTML = "Lotação Média da Propriedade: " + lotacaomedia.formatMoney(2, ".", ",") + " Cabeças por Hectare";

            $("#uacalculo").fadeIn(3000, "linear");
            document.getElementById("uacalculo").innerHTML = "UA por Hectare: " + ua.formatMoney(2, ".", ",") + " UA por Hectare";

            $("#pmachos").fadeIn(3000, "linear");
            document.getElementById("pmachos").innerHTML = "Percentual de Machos: " + (totalm / total * 100).formatMoney(2, ".", ",") + "%";

            $("#pfemeas").fadeIn(3000, "linear");
            document.getElementById("pfemeas").innerHTML = "Percentual de Femeas: " + (totalf / total * 100).formatMoney(2, ".", ",") + "%";

            $("#infocalculo").fadeIn(3000, "linear");
            $("#botao").fadeIn(3000, "linear");

            var datavalor = [totalm, totalf, total, totalcria];
            datavalor.sort(function (a, b) {
                return parseFloat(b - a);
            });

            var data = [{
                    data: [totalm],
                    name: "Total de Machos"
                }, {
                    data: [totalf],
                    name: "Total de Fêmeas"
                }, {
                    data: [total],
                    name: "Total do Rebanho"
                }, {
                    data: [totalcria],
                    name: "Total de Rebanho com Cria"
                }];
            data.sort(function (a, b) {
                return parseFloat(b.data) - parseFloat(a.data);
            });
            var datax = [data[0].name, data[1].name, data[2].name, data[3].name];

            $(function () {
                $('#infocalculo').highcharts({
                    chart: {
                        type: 'bar'
                    },
                    title: {
                        text: 'Resultados'
                    },
                    xAxis: {
                        categories: datax,
                        title: {
                            text: null
                        }
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'Cabeças',
                            align: 'high'
                        },
                        labels: {
                            overflow: 'justify'
                        }
                    },
                    tooltip: {
                        valueSuffix: ' Cabeças'
                    },
                    plotOptions: {
                        bar: {
                            dataLabels: {
                                enabled: true
                            }
                        }
                    },
                    legend: {
                        layout: 'vertical',
                        align: 'right',
                        verticalAlign: 'top',
                        x: -40,
                        y: 80,
                        floating: true,
                        borderWidth: 1,
                        backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
                        shadow: true
                    },
                    credits: {
                        enabled: false
                    },
                    series: [{
                            name: "Cabeças",
                            data: datavalor
                        }]


                });
            });

            $("[type=submit]").prop("disabled", false);

            $("#calcular").attr("href", "#infocalculo");
        }




    });
}
;

function lv1p4(receitas, area) {

    $("[type=submit]").prop("disabled", true);
    $("#calcular").click(function () {

        if (validarForm()) {
            var x = document.getElementsByClassName("form-control");
            var totalcustoproducao = 0;
            var mb = 0;
            var valor = 0;
            for (i = 0; i < x.length; i++) {
                valor = x[i].value.replace(/\./g, "");
                valor = valor.replace(",", ".");
                totalcustoproducao += parseFloat(valor);
            }
            $(function () {
                $('#grafico1').highcharts({
                    chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        type: 'pie'
                    },
                    title: {
                        text: 'Representação dos Custos no Gráfico'
                    },
                    tooltip: {
                        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: true,
                                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                                style: {
                                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black',
                                    fontSize: '13px'
                                }
                            }
                        }
                    },
                    series: [{
                            name: 'Resultados',
                            colorByPoint: true,
                            data: [{
                                    name: 'Medicamento',
                                    y: parseFloat(document.getElementById("medicamento").value.replace(/\./g, "").replace(",", ".")) / totalcustoproducao * 100
                                }, {
                                    name: 'Mão de Obra',
                                    y: parseFloat(document.getElementById("mao_de_obra").value.replace(/\./g, "").replace(",", ".")) / totalcustoproducao * 100,
                                    sliced: true,
                                    selected: true
                                }, {
                                    name: 'Manutenção e Conservação',
                                    y: parseFloat(document.getElementById("maquinas").value.replace(/\./g, "").replace(",", ".")) / totalcustoproducao * 100
                                }, {
                                    name: 'Pastagens e Suplementos',
                                    y: parseFloat(document.getElementById("pastagem").value.replace(/\./g, "").replace(",", ".")) / totalcustoproducao * 100
                                },
                                {
                                    name: 'Outras Despesas',
                                    y: parseFloat(document.getElementById("outros").value.replace(/\./g, "").replace(",", ".")) / totalcustoproducao * 100
                                }]
                        }]
                });
            });

            mb = (receitas - totalcustoproducao) / area;
            $("#infocalculo").fadeIn(3000, "linear");
            document.getElementById("totalcustoproducao").innerHTML = "Total Custos de Produção: R$ " + totalcustoproducao.formatMoney(2, '.', ',');
            document.getElementById("mb").innerHTML = "Margem Bruta por Hectare: R$ " + mb.formatMoney(2, '.', ',');


            $("[type=submit]").prop("disabled", false);

            $("#calcular").attr("href", "#infocalculo");

        }

    });
}
;

function lv2p1() {

    $("[type=submit]").prop("disabled", true);
    $("#calcular").click(function () {

        if (validarForm()) {
            var x = document.getElementsByClassName("form-control");
            var areatotalpecuariainverno = 0;
            var areatotalpecuariaverao = 0;
            var areaaproveitavelinverno = 0;
            var areaaproveitavelverao = 0;
            var areatotal = 0;
            var areamedia = 0;
            var valor = 0;
            var camponativo = 0;
            var matas = 0;
            var outros = 0;
            for (i = 0; i < x.length; i++) {
                valor = x[i].value.replace(/\./g, "");
                valor = valor.replace(",", ".");
                if (i <= 2) {

                    areatotalpecuariaverao += parseFloat(valor);
                    areatotalpecuariainverno += parseFloat(valor);
                }

                if (i === 3) {
                    areatotalpecuariaverao += parseFloat(valor);
                }
                if (i === 4) {
                    areatotalpecuariainverno += parseFloat(valor);
                }

                if (i === 5) {
                    areaaproveitavelverao += parseFloat(valor);
                }
                if (i === 6) {
                    areaaproveitavelinverno += parseFloat(valor);
                }
                if (i === 7 || i === 8) {
                    areaaproveitavelinverno += parseFloat(valor);
                    areaaproveitavelverao += parseFloat(valor);
                }






                if (i === 9 || i === 10 || i === 11) {
                    areatotal += parseFloat(valor);
                }


            }


            areaaproveitavelinverno += areatotalpecuariainverno;
            areaaproveitavelverao += areatotalpecuariaverao;
            areamedia = (areatotalpecuariainverno + areatotalpecuariaverao) / 2;
            areatotal += areaaproveitavelverao;
            $("#infocalculo").fadeIn(3000, "linear");
            //$("#infocalculo2").fadeIn(3000, "linear");
            $("#botao").fadeIn(3000, "linear");
            /*$(function () {
             $('#infocalculo').highcharts({
             chart: {
             plotBackgroundColor: null,
             plotBorderWidth: null,
             plotShadow: false,
             type: 'pie'
             },
             title: {
             text: 'Resultados (Verão) baseados na Area Total da propriedade'
             },
             tooltip: {
             pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
             },
             plotOptions: {
             pie: {
             allowPointSelect: true,
             cursor: 'pointer',
             dataLabels: {
             enabled: true,
             format: '<b>{point.name}</b>: {point.percentage:.1f} %',
             style: {
             color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
             }
             }
             }
             },
             series: [{
             name: 'Resultados',
             colorByPoint: true,
             data: [{
             name: 'Campo Nativo',
             y: camponativo / areatotal
             }, {
             name: 'Pastagens',
             y: areatotalpecuariaverao / areatotal,
             sliced: true,
             selected: true
             }, {
             name: 'Matas',
             y: matas / areatotal
             }, {
             name: 'Outros',
             y: outros / areatotal
             }]
             }]
             });
             });
             */
            $(function () {
                $('#infocalculo').highcharts({
                    colorAxis: {
                        minColor: '#ffffff',
                        maxColor: Highcharts.getOptions().colors[0]
                    },
                    series: [{
                            type: 'treemap',
                            layoutAlgorithm: 'squarified',
                            data: [{
                                    name: 'Pastagens Nativas',
                                    value: parseFloat(document.getElementById("pastagem_nativa_verao").value.replace(/\./g, "").replace(",", ".")),
                                    colorValue: parseFloat(document.getElementById("pastagem_nativa_verao").value.replace(/\./g, "").replace(",", "."))
                                }, {
                                    name: 'Pastagens Nativas Melhoradas',
                                    value: parseFloat(document.getElementById("pastagem_nativa_melhorada_verao").value.replace(/\./g, "").replace(",", ".")),
                                    colorValue: parseFloat(document.getElementById("pastagem_nativa_melhorada_verao").value.replace(/\./g, "").replace(",", "."))
                                }, {
                                    name: 'Pastagens Nativas Perenes',
                                    value: parseFloat(document.getElementById("pastagem_cultivada_perene_verao").value.replace(/\./g, "").replace(",", ".")),
                                    colorValue: parseFloat(document.getElementById("pastagem_cultivada_perene_verao").value.replace(/\./g, "").replace(",", "."))
                                }, {
                                    name: 'Pastagens Anuais de Verão',
                                    value: parseFloat(document.getElementById("pastagem_anual_verao").value.replace(/\./g, "").replace(",", ".")),
                                    colorValue: parseFloat(document.getElementById("pastagem_anual_verao").value.replace(/\./g, "").replace(",", "."))
                                }, {
                                    name: 'Agricultura',
                                    value: parseFloat(document.getElementById("agricultura_verao").value.replace(/\./g, "").replace(",", ".")),
                                    colorValue: parseFloat(document.getElementById("agricultura_verao").value.replace(/\./g, "").replace(",", "."))
                                }, {
                                    name: 'Florestas Plantadas',
                                    value: parseFloat(document.getElementById("florestas_plantadas_verao").value.replace(/\./g, "").replace(",", ".")),
                                    colorValue: parseFloat(document.getElementById("florestas_plantadas_verao").value.replace(/\./g, "").replace(",", "."))
                                }, {
                                    name: 'Outras Culturas',
                                    value: parseFloat(document.getElementById("outras_areas_verao").value.replace(/\./g, "").replace(",", ".")),
                                    colorValue: parseFloat(document.getElementById("outras_areas_verao").value.replace(/\./g, "").replace(",", "."))
                                }, {
                                    name: 'Matas Nativas',
                                    value: parseFloat(document.getElementById("matas_nativas_verao").value.replace(/\./g, "").replace(",", ".")),
                                    colorValue: parseFloat(document.getElementById("matas_nativas_verao").value.replace(/\./g, "").replace(",", "."))
                                }, {
                                    name: 'Sedes, Estradas e Açudes',
                                    value: parseFloat(document.getElementById("sedes_estradas_acudes_verao").value.replace(/\./g, "").replace(",", ".")),
                                    colorValue: parseFloat(document.getElementById("sedes_estradas_acudes_verao").value.replace(/\./g, "").replace(",", "."))
                                }, {
                                    name: 'Inaproveitavel',
                                    value: parseFloat(document.getElementById("inaproveitaveis_verao").value.replace(/\./g, "").replace(",", ".")),
                                    colorValue: parseFloat(document.getElementById("inaproveitaveis_verao").value.replace(/\./g, "").replace(",", "."))
                                }]
                        }],
                    title: {
                        text: 'Desenho da propriedade'
                    },
                    plotOptions: {
                        treemap: {
                            //  area: { cropThreshold: 500 },
                            dataLabels: {
                                // overflow: 'right',
                                //  crop: true,
                                formatter: function () {
                                    return '<b>' + this.point.name + ':</b> ' +
                                            '<br/>' +
                                            '<b>' + this.point.value + ' ha</b>';
                                    //  return '$' + this.point.name
                                }
                            }
                        }
                    }
                });
            });
            /*document.getElementById("areatotalpecuariainverno").innerHTML += " " + areatotalpecuariainverno + " HM²";
             document.getElementById("areatotalpecuariaverao").innerHTML += " " + areatotalpecuariaverao + " HM²";
             document.getElementById("areaaproveitavelinverno").innerHTML += " " + areaaproveitavelinverno + " HM²";
             document.getElementById("areaaproveitavelverao").innerHTML += " " + areaaproveitavelverao + " HM²";
             document.getElementById("areatotal").innerHTML += " " + areatotal + " HM²";
             document.getElementById("areamedia").innerHTML += " " + areamedia + " HM²";*/

            $("[type=submit]").prop("disabled", false);

            $("#calcular").attr("href", "#infocalculo");
        }




    });
}
;

function lv2p2(area) {

    $("[type=submit]").prop("disabled", true);
    $("#calcular").click(function () {

        if (validarForm()) {
            var x = document.getElementsByClassName("form-control");
            var tabela = "<table class='table table-bordered table-responsive text-center '><tr class='rowhighlight'><th class='text-center'>Categorias</th><th class='text-center'>Jan A Mar</th><th class='text-center'>Abr A Jun</th><th class='text-center'>Jul A Set</th><th class='text-center'>Out A Dez</th></tr>";
            var conttabela = 0;
            var totalb = 0;
            var totalbjm = 0;
            var totalbaj = 0;
            var cont1 = 0;
            var totalbjs = 0;
            var totalbod = 0;
            var percentualrebanhocomcria = 0;
            var lotacaomedia = 0;
            var valor = 0;
            var vacadecria = 0;
            var vacadedescarte = 0;
            var touros = 0;
            var terneiros = 0;
            var terneiras = 0;
            var novilhos13 = 0;
            var novilhas13 = 0;
            var novilhos25 = 0;
            var novilhas25 = 0;
            var novilhos36 = 0;
            for (i = 0; i < x.length; i++) {

                valor = x[i].value.replace(/\./g, "");
                valor = valor.replace(",", ".");
                cont1++;
                if (i === 0) {
                    tabela = tabela + "<tr><td>Vacas De Cria</td>";
                } else if (i === 4) {
                    tabela = tabela + "<tr><td>Vaca de Descarte</td>";
                } else if (i === 8) {
                    tabela = tabela + "<tr><td>Touros</td>";
                } else if (i === 12) {
                    tabela = tabela + "<tr><td>Terneiros</td>";
                } else if (i === 16) {
                    tabela = tabela + "<tr><td>Terneiras</td>";
                } else if (i === 20) {
                    tabela = tabela + "<tr><td>Novilhos: 13 a 24</td>";
                } else if (i === 24) {
                    tabela = tabela + "<tr><td>Novilhas: 13 a 24</td>";
                } else if (i === 28) {
                    tabela = tabela + "<tr><td>Novilhos: 25 a 36</td>";
                } else if (i === 32) {
                    tabela = tabela + "<tr><td>Novilhas: 25 a 36</td>";
                } else if (i === 36) {
                    tabela = tabela + "<tr><td>Novilhos: Mais de 36</td>";
                }
                if (cont1 === 1) {
                    tabela += "<td>" + valor + "</td>";
                    totalbjm += parseInt(valor);
                }
                if (cont1 === 2) {
                    tabela += "<td>" + valor + "</td>";
                    totalbaj += parseInt(valor);
                }
                if (cont1 === 3) {
                    tabela += "<td>" + valor + "</td>";
                    totalbjs += parseInt(valor);
                }
                if (cont1 === 4) {
                    tabela += "<td>" + valor + "</td></tr>";
                    totalbod += parseInt(valor);
                    cont1 = 0;
                    conttabela++;
                }



                if (i <= 3) {
                    vacadecria += parseInt(valor);
                }

                if (i > 3 && i <= 7) {
                    vacadedescarte += parseInt(valor);
                }

                if (i > 7 && i <= 11) {
                    touros += parseInt(valor);
                }

                if (i > 11 && i <= 15) {
                    terneiros += parseInt(valor);
                }

                if (i > 15 && i <= 19) {
                    terneiras += parseInt(valor);
                }

                if (i > 19 && i <= 23) {
                    novilhos13 += parseInt(valor);
                }
                if (i > 23 && i <= 27) {
                    novilhas13 += parseInt(valor);
                }
                if (i > 27 && i <= 31) {
                    novilhos25 += parseInt(valor);
                }
                if (i > 31 && i <= 35) {
                    novilhas25 += parseInt(valor);
                }
                if (i > 35 && i <= 39) {
                    novilhos36 += parseInt(valor);
                }




            }
            totalb = (vacadecria / 4) + (vacadedescarte / 4) + (touros / 4) + (terneiros / 4) + (terneiras / 4) + (novilhos13 / 4) + (novilhas13 / 4) + (novilhos25 / 4) + (novilhas25 / 4) + (novilhos36 / 4);
            var valores = [{
                    data: [vacadecria / 4],
                    name: "Vacas de Cria"
                }, {
                    data: [vacadedescarte / 4],
                    name: "Vacas de Descarte"
                }, {
                    data: [touros / 4],
                    name: "Touros"
                }, {
                    data: [terneiros / 4],
                    name: "Terneiros"
                }, {
                    data: [terneiras / 4],
                    name: "Terneiras"
                }, {
                    data: [novilhos13 / 4],
                    name: "Novilhos de 13 a 24 Meses"
                }, {
                    data: [novilhas13 / 4],
                    name: "Novilhas de 13 a 24 Meses"
                }, {
                    data: [novilhos25 / 4],
                    name: "Novilhos de 25 a 36 Meses"
                }, {
                    data: [novilhas25 / 4],
                    name: "Novilhas de 25 a 36 Meses"
                }, {
                    data: [novilhos36 / 4],
                    name: "Novilhos com Mais de 36 Meses"
                }];
            valores.sort(function (a, b) {
                return parseFloat(b.valor) - parseFloat(a.valor);
            });
            /*$(function () {
             $('#infocalculo').highcharts({
             chart: {
             type: 'column'
             },
             title: {
             text: 'Média do Total de Bovinos por Categoria'
             },
             xAxis: {
             categories: ["Categorias de Bovinos"],
             crosshair: true
             },
             yAxis: {
             title: {
             text: 'Cabeças'
             }
             },
             tooltip: {
             headerFormat: '<span style="font-size:10px">Categorias</span><table>',
             pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
             '<td style="padding:0"><b>{point.y:.1f} cabeças</b></td></tr>',
             footerFormat: '</table>',
             shared: true,
             useHTML: true
             },
             plotOptions: {
             column: {
             pointPadding: 0.2,
             borderWidth: 0
             }
             },
             series: valores
             });
             });*/
            percentualrebanhocomcria = (vacadecria / 4 / totalb) + (touros / 4 / totalb) + (terneiros / 4 / totalb) + (terneiras / 4 / totalb) + (novilhas13 / 4 / totalb) + (novilhas25 / 4 / totalb);
            percentualrebanhocomcria = percentualrebanhocomcria * 100;
            lotacaomedia = totalb / area;
            $("#infocalculo").fadeIn(3000, "linear");
            $("#botao").fadeIn(3000, "linear");
            //$("#infocalculo2").fadeIn(3000, "linear");
            /*$("#totalbjm").html(totalbjm + " Cabeças");
             $("#totalbaj").html(totalbaj + " Cabeças");
             $("#totalbjs").html(totalbjs + " Cabeças");
             $("#totalbod").html(totalbod + " Cabeças");*/
            console.log(tabela);
            document.getElementById("infocalculo").innerHTML = tabela + "<tr class='rowhighlight'><td>Total de Bovinos no Período</td><td>" + totalbjm + "</td><td>" + totalbaj + "</td><td>" + totalbjs + "</td><td>" + totalbod + "</td></tr><tr class='rowhighlight'><td>Percentual do Rebanho com Atividade de Cria: </td><td colspan='4' class='text-center'>" + percentualrebanhocomcria.formatMoney(2, ".", ",") + " %</td></tr><tr class='rowhighlight'><td>Lotação Média da Propriedade: </td><td colspan='4' class='text-center'>" + lotacaomedia.formatMoney(2, ".", ",") + " Cabeça(s)/Hectare" + "</td></tr>" + "</table>";
            //document.getElementById("percentualrebanhocomcria").innerHTML = "Percentual do Rebanho com Atividade de Cria: " + percentualrebanhocomcria.formatMoney(2, ".", ",") + " %";
            //document.getElementById("lotacaomedia").innerHTML = "Lotação Média da Propriedade: " + lotacaomedia.formatMoney(2, ".", ",") + " Cabeça(s)/Hectare";
            $("[type=submit]").prop("disabled", false);

            $("#calcular").attr("href", "#infocalculo");
        }



    });
}
;

function lv2p3(area) {

    $("[type=submit]").prop("disabled", true);
    $("#calcular").click(function () {

        if (validarForm()) {
            var x = document.getElementsByClassName("form-control");
            var totalb = 0;
            var totalreceita = 0;
            var receitahectare = 0;
            var porcentagem = [];
            var valorGrafico = [];
            var contador1 = 0;
            var tabela = "<table class='table table-bordered table-responsive text-center '><tr class='rowhighlight'><th class='text-center'>Categorias</th><th class='text-center'>Quantidade</th><th class='text-center'>Preço por Cabeça</th><th class='text-center'>Peso Médio</th><th class='text-center'>Receita</th><th class='text-center'>Porcentagem da Receita</th></tr>";
            var cont = 0;
            for (i = 0; i < x.length; i++) {
                var valor = x[i].value.replace(/\./g, "");
                valor = valor.replace(",", ".");

                if (i === 0) {
                    tabela = tabela + "<tr><td>Terneiros</td>";
                } else if (i === 3) {
                    tabela = tabela + "<tr><td>Terneiras</td>";
                } else if (i === 6) {
                    tabela = tabela + "<tr><td>Novilhas</td>";
                } else if (i === 9) {
                    tabela = tabela + "<tr><td>Vacas de Descarte</td>";
                } else if (i === 12) {
                    tabela = tabela + "<tr><td>Vacas Prenhas</td>";
                } else if (i === 15) {
                    tabela = tabela + "<tr><td>Vacas com Cria</td>";
                } else if (i === 18) {
                    tabela = tabela + "<tr><td>Vacas Gordas</td>";
                } else if (i === 21) {
                    tabela = tabela + "<tr><td>Novilhos para Recria</td>";
                } else if (i === 24) {
                    tabela = tabela + "<tr><td>Novilhos Gordos</td>";
                } else if (i === 27) {
                    tabela = tabela + "<tr><td>Torunos</td>";
                } else if (i === 30) {
                    tabela = tabela + "<tr><td>Touros</td>";
                }

                if (cont === 0) {
                    totalb += parseFloat(valor);
                    tabela += "<td>" + valor + " cab</td>";
                    valorGrafico = valorGrafico.concat([{name: ucFirstAllWords(x[i].name.replace(/\_/g, " ")), y: parseFloat(valor)}]);
                } else if (cont === 1) {
                    var valor1 = x[i - 1].value.replace(".", "");
                    valor1 = valor1.replace(",", ".");

                    var valor2 = x[i + 1].value.replace(".", "");
                    valor2 = valor1.replace(",", ".");
                    totalreceita += parseFloat(valor) * parseFloat(valor1);
                    porcentagem[contador1] = (parseFloat(valor) * parseFloat(valor1));
                    contador1++;
                    tabela += "<td>R$ " + parseFloat(valor).formatMoney(2, ".", ",") + "</td><td>" + valor2 + " KG </td><td>R$ " + (parseFloat(valor) * parseFloat(valor1)).formatMoney(2, ".", ",") + "</td><td>valorreplace" + [i] + "</td></tr>";

                }
                if (cont === 2) {
                    cont = 0;
                } else {
                    cont++;

                }







            }

            for (var i = 0; i < valorGrafico.length; i++) {
                valorGrafico[i].valor = parseFloat(valorGrafico[i].valor / totalb);
            }
            $(function () {
                $('#grafico1').highcharts({
                    chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        type: 'pie'
                    },
                    title: {
                        text: 'Representação da Quantidade de Animais no Gráfico'
                    },
                    tooltip: {
                        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: true,
                                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                                style: {
                                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black',
                                    fontSize: '13px'
                                }
                            }
                        }
                    },
                    series: [{
                            name: 'Resultados',
                            colorByPoint: true,
                            data: valorGrafico
                        }]
                });
            });

            receitahectare = totalreceita / area;
            $("#infocalculo").fadeIn(3000, "linear");
            $("#grafico1").fadeIn(3000, "linear");

            $("#botao").fadeIn(3000, "linear");
            contador1 = 0;
            for (var i = 1; i <= 32; i += 3) {
                tabela = tabela.replace("valorreplace" + i, (porcentagem[contador1] / totalreceita * 100).formatMoney(2, ".", ",") + " %");
                contador1++;
            }
            document.getElementById("infocalculo").innerHTML = tabela + "<tr class='rowhighlight'><td>Total de Bovinos</td><td colspan='5'>" + totalb.formatMoney(0, ".", ",") + " CAB</td></tr><tr class='rowhighlight'><td>Total Receita</td><td colspan='5'>" + totalreceita.formatMoney(2, ".", ",") + " R$ </td></tr><tr class='rowhighlight'><td>Receita por Hectare</td><td colspan='5'>" + receitahectare.formatMoney(2, ".", ",") + " R$/ha</td></tr></table>";

            /*document.getElementById("totalb").innerHTML = "Total de Bovinos: " + totalb.formatMoney(0, ".", ",") + " Cabeça(s)";
             document.getElementById("totalreceita").innerHTML = "Total de Receita de Bovinos: R$ " + totalreceita.formatMoney(2, ".", ",");
             document.getElementById("receitahectare").innerHTML = "Receita por Hectare " + receitahectare.formatMoney(2, ".", ",") + " R$/HM²";*/
            $("[type=submit]").prop("disabled", false);

            $("#calcular").attr("href", "#grafico1");
        }




    });
}
;

function ucFirstAllWords(str)
{
    str = str.toLowerCase();
    var pieces = str.split(" ");
    for (var i = 0; i < pieces.length; i++)
    {
        var j = pieces[i].charAt(0).toUpperCase();
        pieces[i] = j + pieces[i].substr(1);
    }
    return pieces.join(" ");
}

function lv2p4(area, terneiros, porcentagem, receita, kg) {

    $("[type=submit]").prop("disabled", true);
    $("#calcular").click(function () {

        if (validarForm()) {
            var x = document.getElementsByClassName("form-control");
            var totalcustoproducao = 0;
            var custoatividadecria = 0;
            var custoproducaohectar = 0;
            var custoterneiro = 0;
            var valor = 0;
            var medicamento = 0, mao_de_obra = 0, pastagem = 0, manutencao = 0, outros = 0;
            var margembruta = 0;
            /*var tabela = "<table class='table table-bordered table-responsive text-center '><tr class='rowhighlight'><th class='text-center'>Categorias</th><th class='text-center'>Gastos</th><th class='text-center'>Percentuais</th></tr>";*/
            for (i = 0; i < x.length; i++) {
                valor = x[i].value.replace(/\./g, "");
                valor = valor.replace(",", ".");
                if (i === 16 || i === 17) {
                    mao_de_obra += parseFloat(valor);
                }
                if (i <= 1) {
                    medicamento += parseFloat(valor);
                }
                if (i === 8 || i === 9 || i === 2 || i === 3 || i ===7) {
                    pastagem += parseFloat(valor);
                }
                if (i === 10 || i === 18 || i === 19) {
                    manutencao += parseFloat(valor);
                }
                if (i > 3 && i < 7 || i >= 11 && i <= 16) {
                    outros += parseFloat(valor);
                }
                totalcustoproducao += parseFloat(valor);
            }
            custoatividadecria += totalcustoproducao * (porcentagem / 100);
            custoproducaohectar += custoatividadecria / area;
            custoterneiro += custoatividadecria / terneiros;
            $(function () {
                $('#grafico1').highcharts({
                    chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        type: 'pie'
                    },
                    title: {
                        text: 'Representação dos Custos no Gráfico'
                    },
                    tooltip: {
                        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: true,
                                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                                style: {
                                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                                }
                            }
                        }
                    },
                    series: [{
                            name: 'Resultados',
                            colorByPoint: true,
                            data: [{
                                    name: 'Medicamento',
                                    y: medicamento / totalcustoproducao * 100
                                }, {
                                    name: 'Mão de Obra',
                                    y: mao_de_obra / totalcustoproducao * 100,
                                    sliced: true,
                                    selected: true
                                }, {
                                    name: 'Manutenção e Conservação',
                                    y: manutencao / totalcustoproducao * 100
                                }, {
                                    name: 'Pastagens e Suplementos',
                                    y: pastagem / totalcustoproducao * 100
                                },
                                {
                                    name: 'Outras Despesas',
                                    y: outros / totalcustoproducao * 100
                                }]
                        }]
                });
            });
            $("#infocalculo").fadeIn(3000, "linear");
            $("#botao").fadeIn(3000, "linear");

            document.getElementById("totalcustoproducao").innerHTML = "Total Custos de Produção: R$ " + totalcustoproducao.formatMoney(2, ".", ",");
            document.getElementById("custoatividadecria").innerHTML = "Custo Atividade de Cria: R$ " + custoatividadecria.formatMoney(2, ".", ",");
            document.getElementById("custoproducaohectar").innerHTML = "Custo de Produção por Hectare: " + custoproducaohectar.formatMoney(2, ".", ",") + " R$/ha";
            document.getElementById("custoterneiro").innerHTML = "Custo de Produção por Terneiro Desmamado: " + custoterneiro.formatMoney(2, ".", ",") + " R$/Cabeça(s)";
            document.getElementById("margembruta").innerHTML = "Margem Bruta por Hectare: " + ((receita - totalcustoproducao) / area).formatMoney(2, ".", ",") + " R$/ha";
            document.getElementById("producaocarne").innerHTML = "Produção de Carne: " + (kg / area).formatMoney(2, ".", ",") + " KG/ha";

            $("[type=submit]").prop("disabled", false);
            cont = 1;
            $("#calcular").attr("href", "#infocalculo");
        }



    });
}
;