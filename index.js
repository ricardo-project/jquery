//$(document).ready(function() {
    const pi = Math.PI
    const h = 25
    let formI = $("header i")
    let sForm = $(".sectForm")
    formI.on("click", function() {
        if($(this).attr("style") == "") {
            $(this).css("color", "rgb(231 138 181)")
            sForm.css("left", "0%")
        } else {
            $(this).attr("style", "")
            sForm.attr("style", "")
        }
    })
    let menuC = $(".menuCont")
    menuC.find("polygon").on("click", function() {
        menuC.css("width", "8rem")
        $(".artcCont").css("width", "calc(100% - 8rem)")
        $(".menuDivCompac").attr("style", "")
        $(this).parent().parent().css("transform", "scale(0)")
        setTimeout(function() {
            $(".menuDivCompac").css("opacity", 1)
        }, 50)
    })
    let SVG = $(".wave svg")
    let polyg = $(".wave polygon")
    let addPoint = function(X, Y, j, e) {
        let P = e.createSVGPoint()
        P.x = X
        P.y = Y
        polyg[j].points.appendItem(P)
    }
    $.each(SVG, (j, e) => {
        const W = $(e).width()
        for(let i = 0; i <= W; i++) {
            addPoint(i, h*(Math.cos(2*pi*(i/256 - j/2)) + 1)/2, j, e)
        } addPoint(W, h, j, e)
        addPoint(0, h, j, e)
    })
    let Want = null, Hant = null
    let W = window.innerWidth
    let H = window.innerHeight
    let S = 0
    let iS = new Array(-1, -1)
    let conjP = new Array($(".artcDiv p, .artcDiv figure"), $(".artcDiv h1"))
    let menuO = $(".menuOpt")
    let Rdiv = $(".menuReta div")
    let bckC = $(".backCapa")
    let Top = 0
    let showParag = function() {
        Top = $(window).scrollTop()
        const newS = Top + H*3/4
        if(newS > S || Want < W) {
            for(let n = 0; n <= 1; n++) {
                const qtdP = conjP[n].length - 1
                let Break = false
                let newiS
                for(let j = iS[n] + 1; j <= qtdP; j++) {
                    const actP = $(conjP[n][j])
                    if(actP.offset().top > newS) {
                        newiS = j - 1
                        Break = true
                        break
                    } else {
                        actP.css("opacity", 1)
                        actP.css("left", "0px")
                        if(n == 1) {
                            $(menuO[j]).addClass("menuSlct")
                        }
                    }
                } if(!Break) {
                    newiS = qtdP
                } if(newiS !== iS[n]) {
                    iS[n] = newiS
                    if(n == 1) {
                        Rdiv.css("height", 100*newiS/qtdP + "%")
                    }
                }
            }
        } else if(newS < S) {
            for(let n = 0; n <= 1; n++) {
                const qtdP = conjP[n].length - 1
                let Break = false
                let newiS
                for(let j = iS[n]; j >= 0; j--) {
                    const actP = $(conjP[n][j])
                    if(actP.offset().top <= newS) {
                        newiS = j
                        Break = true
                        break
                    } else {
                        actP.attr("style", "")
                        if(n == 1) {
                            $(menuO[j]).removeClass("menuSlct")
                        }
                    }
                } if(!Break) {
                    newiS = -1
                } if(newiS !== iS[n]) {
                    iS[n] = newiS
                    if(n == 1) {
                        Rdiv.css("height", 100*newiS/qtdP + "%")
                    }
                }
            }
        } S = newS
        Want = W
        Hant = H
        W = window.innerWidth
        H = window.innerHeight
    }
    $(window).on("resize", showParag)
    $.each(menuO, (i, e) => {
        $(e).on("click", function() {
            console.log(Top/$(document).height(), ' to ', $(conjP[1][i]).offset().top/$(document).height())
        })
    })
    
    showParag()
    $(window).on("scroll", showParag)
//})