const suits = [ "H", "K" ,"R" ,"S"] ;

let deck =[] ;

let round = 0;

for (let s = 0; s < suits.length; s++) {
    
    for (let v = 1; v <= 13;  v++) {
        
        let value = v ;
        
        if (v === 1) value = 14; 

            let number = v < 10 ? "0" + v : v;

            let imagePath = "Images/" + suits [s] + number + ".png"
        
            deck.push( {
                value : value,
                Image :imagePath
            }

            )
    }
}
 console.log(deck);
  console.log("Total cards:", deck.length);

  
 /* shuffle */

 /* function shuffle (array) {
    for (let i =  array.length  -1; i > 0 ; i --) {
        let j = Math.floor (Math.random () * (i+1));
        
       [array[i], array[j] =  array[j] , array[i]] ;
    }
 }
 
  */

 deck.sort (()  => Math.random () -0.5)

 console.log(deck.map (c=> c.Image));/* order of images after shuffled  */
 
 /* split deck betweeen two players   */
 let player1 = deck.slice (0,26);
 let player2 = deck.slice (26);
 console.log("player1 cards:" , player1.length);
 console.log("player2 cards:" , player2.length);

 /* connect HTML pictures  */

 const card1 = document.getElementById("card1")
 const card2= document.getElementById("card2")
 console.log("card elements :", card1 , card2);
 
 const count1 = document.getElementById ("count1");   /* numbers to appear in html */
const count2 = document.getElementById ("count2");

const message = document.getElementById ("message")
const roundText = document.getElementById ("round")

 count1.textContent = player1.length;  /* showing the starting number 26 outside  */
    count2.textContent = player2.length;    
 /* game  */

 function playRound  (){

   if (player1.length === 0 || player2.length === 0) {
      checkWinner() ;
      return ;
   }

    let c1 = player1.shift();
    let c2 = player2.shift ();  /* draw top cards  */

    card1.src = c1.Image;
    card2.src = c2.Image;     /* show card images  */

     /* compare cards  */
     if (c1.value> c2.value) {
        player1.push (c1,c2);
        message.textContent="Spiller 1 vinner denne runden ! ";

     } 
     else if (c2.value >c1.value){
        player2.push(c1,c2);
        message.textContent = "Spiller 2 vinner denne runden !"
     }

     
     else  {
       /* Tie WAR */
         message.textContent ="Krig! Tre kort settes til side og nytt avgjørende kort trekkes !"
        setTimeout(() => war ([c1,c2]), 10000); /* call war function */     /* 0.5 second delay  */
        
     }
     console.log("round: " + round );
     
   console.log("player1 drew " , c1);
   console.log("player2 drew ", c2 );
 
    round++;

   roundText.textContent = round; /* round shown on html  */
    if (round >= 30) {
      if (player1.length > player2.length  ){
         alert ("spiller 1 vant  Krig") 
         
      }  else if (player2.length > player1.length) {
         alert ("Spiller 2 vant  krig") 
      } else{
         alert ("Uagvgjort spill ") 
      }
      return;

    }

    count1.textContent = player1.length;  /* starting counting 25 */
    count2.textContent = player2.length;

    checkWinner ();

    console.log("Remaining player 1 cards :", player1.length);
    console.log("Remaining player 2 cards :", player2.length);
 
 

     }

     /* war function  */

     function war(pile) {
      if (player1.length < 4 || player2.length < 4  ) {
         
      checkWinner();
      return;

      }

      /* 3 face down  */
        for (let i = 0; i < 3; i++) {
         
         pile.push (player1.shift());
         pile.push(player2.shift ()) ;
         
        }

        /* 1 face -up card */
        let warCard1 = player1.shift();
        let warCard2 = player2.shift ();

        pile.push (warCard1);
        pile.push (warCard2);

        card1.src = warCard1.Image;

      card2.src = warCard2.Image;

      if (warCard1.value > warCard2.value) {
         player1.push (...pile);
         message.textContent = "spiller 1 vinner Krigen ! "
      } 
         
       else if (warCard2.value > warCard1.value) {
         player2.push (...pile);
         message.textContent = "spiller 2 vinner Krigen ! "
         
       }

       else {
         message.textContent = "Krig igjen!"
        setTimeout(() =>war (pile) ,10000 ); /* recursive war with delay  */
         return ;
       }

       count1.textContent = player1.length;
       count2.textContent = player2.length ;
     }

     function checkWinner() {
      if (player1.length === 0) {
         alert("spiller 2 vant spillet !")
      }
      
      if (player2.length ===  0) {
         alert("spiller 1 vant spillet !")
      }
     }


    