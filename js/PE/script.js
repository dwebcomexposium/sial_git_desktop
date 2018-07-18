/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Document.prototype.ready = function(callback) {
                if(callback && typeof callback === 'function') {
                    document.addEventListener("DOMContentLoaded", function() {
                        if(document.readyState === "interactive" || document.readyState === "complete") {
                            return callback();
                        }
                    });
                }
            };

            document.ready(function() {

                var price = {val:0};
                var price2 = {val1:0};
                var price3 = {val2:0};
                var price4 = {val3:0};

                function updatingPrice1(updatedValue) {
                  price = updatedValue.val;
                  document.getElementById("price-val1").innerHTML = updatedValue.val;
                }
                function updatingPrice2(updatedValue) {
                  price2 = updatedValue.val1;
                  document.getElementById("price-val2").innerHTML = updatedValue.val1;
                }
                function updatingPrice3(updatedValue) {
                  price3 = updatedValue.val2;
                  document.getElementById("price-val3").innerHTML = updatedValue.val2;
                }
                function updatingPrice4(updatedValue) {
                  price4 = updatedValue.val3;
                  document.getElementById("price-val4").innerHTML = updatedValue.val3;
                }

                tl = new TimelineMax();
                tl
                .set(["#wrapper", "#wrapper_mobile", ".footer"], {"visibility" : "visible"})
        
                //anim lemon
                
                .from(".lemon1", .6, { x:200, autoAlpha: 0, ease:Power1.easeInOut },"+=0.5")
                .from(".lemon2", .6, { x:-200, autoAlpha: 0, ease:Power1.easeInOut },"-=0.4")
                .from(".lemon3", .6, { x:200, autoAlpha: 0, ease:Power1.easeInOut },"-=0.4")
                .from(".lemon4", .6, { x:-200, autoAlpha: 0, ease:Power1.easeInOut },"-=0.4")
                .from(".lemon5", .6, { x:200, autoAlpha: 0, ease:Power1.easeInOut },"-=0.4")
                .from(".lemon6", .6, { x:-200, autoAlpha: 0, ease:Power1.easeInOut },"-=0.4")
                .from(".lemon7", .6, { x:200, autoAlpha: 0, ease:Power1.easeInOut },"-=0.4")
                .from(".lemon8", .6, { x:-200, autoAlpha: 0, ease:Power1.easeInOut },"-=0.4")
                .from(".lemon9", .6, { x:200, autoAlpha: 0, ease:Power1.easeInOut },"-=0.4")
                .from(".look", .6, { y:50, autoAlpha: 0, ease:Power1.easeInOut },"-=0.4")
                //anim title
                
                .from(".titre1", .6, { y:50, autoAlpha: 0, ease:Power1.easeInOut },"-=2")
                
                
                //anim reasons
                
                .from(["#reasons_container", "#reasons_container_mobile"], .6, { x:100, autoAlpha: 0, ease:Power1.easeInOut },"-=0.5")
                
                //.from(".reason1", .6, { x:100, autoAlpha: 0, ease:Power1.easeInOut },"-=1")
                //.from(".reason2", .6, { x:100, autoAlpha: 0, ease:Power1.easeInOut },"-=.8")
                //.from(".reason3", .6, { x:100, autoAlpha: 0, ease:Power1.easeInOut },"-=.6")
                //.from(".reason4", .6, { x:100, autoAlpha: 0, ease:Power1.easeInOut },"-=.4")
                
                //anim block
                
                .from(["#block_container", "#block_container_mobile"], .6, { x:-100, autoAlpha: 0, ease:Power1.easeInOut },"-=.6")
        
                
                
                //anim footer
                
                .from(".txt_footer", .6, { y:-50, autoAlpha: 0, ease:Power3.easeInOut },"-=.5")
                .from(".stat1", .6, { y:50, autoAlpha: 0, ease:Power1.easeInOut })
                .from(".stat2", .6, { y:50, autoAlpha: 0, ease:Power1.easeInOut },"-=.3")
                .from(".stat3", .6, { y:50, autoAlpha: 0, ease:Power1.easeInOut },"-=.3")
        
                //anim chiffre
        
                .to(price, 1.5, {val:"+=7200", roundProps:"val", onUpdate:updatingPrice1, onUpdateParams:[price], ease:Power1.easeInOut},"-=.5")
                .to(price2, 1.5, {val1:"+=109", roundProps:"val1", onUpdate:updatingPrice2, onUpdateParams:[price2], ease:Power1.easeInOut},"-=1.5")
                .to(price3, 1.5, {val2:"+=85", roundProps:"val2", onUpdate:updatingPrice3, onUpdateParams:[price3], ease:Power1.easeInOut},"-=1.5")
                .to(price4, 1.5, {val3:"+=21", roundProps:"val3", onUpdate:updatingPrice4, onUpdateParams:[price4], ease:Power1.easeInOut},"-=1.5")
            });

