import config from "../config"
import { ReplyContext } from "../reply_context"
import { Command } from "./command"

const TRASH_REGEX = new RegExp("how do you stay so positive in such a horrible world?")
const DROP_REGEX = new RegExp("drop")

const AFFIRMATIONS = [
  "I am the architect of my life. I am the creator of my reality.",
  "I accept and love myself just the way I am.",
  "I am supported and loved by God (or: the Creator/Universe/etc.)",
  "I am surrounded by abundance.",
  "I am healthy, energetic and optimistic.",
  "I am overflowing with happiness, joy and satisfaction.",
  "My body is relaxed. My mind is calm. My soul is at peace.",
  "I am able to achieve whatever I desire.",
  "I transcendent negativity.",
  "I can achieve greatness.",
  "Everything happens for a reason. Everything leads to something positive.",
  "I am forgiving. My compassion replaces anger with love.",
  "I am able to conquer all the challenges I am confronted with.",
  "I am becoming more confident and stronger each day.",
  "My potential to succeed is infinite.",
  "I am becoming more knowledgeable and wiser with each day.",
  "I am creative and bursting with brilliant ideas.",
  "I am courageous and overcome my fears by confronting them.",
  "I am at peace with my past.",
  "I radiate love, happiness, grace and positivity",
  "I am patient, diplomatic and tolerant.",
  "I am grateful for the wonders in my life.",
  "The universe supports me in every possible way.",
  "Every experience in my life helps me to grow.",
  "Today I lay the foundation for a wonderful future.",
  "I am safe and protected by divinity.",
  "I speak kindly of others.",
  "Everything I seek can be found within.",
  "I set myself free by forgiving myself.",
  "I am significant. I contribute to the advancement of humankind.",
  "I love myself and feel great about myself.",
  "I accept myself unconditionally.",
  "I see problems as interesting challenges.",
  "I radiate confidence.",
  "Challenges bring out the best in me.",
  "I have confidence in my abilities and skills.",
  "I make sound decisions.",
  "I am bold and courageous.",
  "I face difficulty with courage.",
  "I am worthy of happiness and love.",
  "My heart is always open. I am kind to every person I meet.",
  "I am surrounded by love. I attract kind people.",
  "I love unconditionally and without hesitation.",
  "I deserve love. I am loved and appreciated by those around me.",
  "Everywhere I go, I am accompanied by love.",
  "Love, forgiveness and understanding is the very foundation of my relationship.",
  "I give and receive love equally.",
  "I accept my partner unconditionally.",
  "I am treasured for who I really am.",
  "My marriage/relationship is becoming stronger, deeper and more loving with every day.",
  "I attract money effortlessly and easily.",
  "I continuously discover new avenues of income.",
  "I am open to all the wealth life has to offer.",
  "I use money to better other people’s lives.",
  "I attract lucrative opportunities to create money.",
  "I see abundance everywhere.",
  "I am becoming more and more prosperous with every day.",
  "Life takes care of all my needs.",
  "My life is full of prosperity.",
  "I deserve abundance and prosperity.",
  "Every day I’m getting healthier.",
  "I am full of vitality.",
  "I take good care of my body and eat a healthy, well-balanced diet.",
  "My body is a holy temple. I keep it clean and maintain its functionality.",
  "I exercise regularly and strengthen my body.",
  "My work/business makes a profound difference in this world.",
  "I am building a successful business.",
  "I create value with my service. My business is a gift to this world.",
  "I am savvy about business.",
  "Each failure has made me a better businessman/businesswoman.",
  "The divine guides all my actions.",
  "I am a spiritual being that is divinely guided.",
  "I am in alignment with the universe.",
  "God’s grace and love is working through me.",
  "I see myself and the spark of divinity in others.",
  "Everything leads to something better.",
  "I am able to find positivity in every situation.",
  "I am able to find optimistic ways of dealing with difficulties.",
  "There is good to be found in every situation, even if I may not see it at the moment.",
  "There is always another way. There is always a solution to my problems.",
  "I stay calm in frustrating situations.",
  "I forgive others for their mistakes.",
  "I forgive myself for all my mistakes, failures and shortcomings.",
  "I let go of anger. It helps me to meet better decisions and see things more clearly.",
  "Compassion and understanding help me to overcome anger.",
  "My intuition and inner wisdom guide me in every situation",
  "Life always wants the best for me.",
  "The challenges I’m confronted with are opportunities for growth.",
  "Every time I exhale, I breathe out tensions and anxieties.",
  "Every situation serves my highest good.",
  "I am a kind and unique person. I have a lot to offer in a friendship.",
  "I enjoy my own company, it helps me to get in touch with my true self.",
  "Solitude helps me rejuvenate.",
  "I am at peace and happy when I’m alone.",
  "I can always brighten another person’s day by doing something with them.",
  "My intuition and wisdom guide me in the right direction.",
  "I have faith in myself. I am able to meet the best decision possible.",
  "I have confidence in my decisions.",
  "Even if I meet the wrong decision, it will always lead me somewhere positive.",
  "I need responsible decisions and consider how they affect other people.",
  "My friendships are meaningful, supportive and rewarding.",
  "My friends love me for who I am.",
  "I am accepting of others; it helps me to establish long-lasting friendships.",
  "I attract positive people with whom I quickly make friends.",
  "I surround myself with friends who care about me and treat me well.",
  "I feel wonderfully peaceful and relaxed.",
  "I let go of everything that worries me. I will confront these challenges tomorrow.",
  "My mind is at peace.",
  "I fall into a deep and relaxing sleep.",
  "I am feeling very sleepy and am ready to fall asleep.",
  "I feel relaxed and comfortable around other people.",
  "I enjoy meeting new people. I even seek out others.",
  "I am outgoing. I can enrich other people’s lives.",
  "I’m excited about the amazing people I’m going to meet today.",
  "I’m easy to talk to. I am confident when I’m around others.",
  "My job adds satisfaction and fulfillment to my life.",
  "I am exactly where want to be. My career provides me the right opportunities to grow.",
  "I am valued and appreciated at my workplace. My voice is always heard.",
  "I ask for meaningful work and perform it with the greatest diligence and attention.",
  "My work has a profound impact on this world.",
  "Today will be a fabulous day.",
  "This day will bring me nothing but joy, fulfillment and happiness.",
  "I have all it takes to make this day relevant.",
  "I face the difficulties of this day with courage and endurance.",
  "I am excited to see what the present day holds.",
  "I am optimistic about the future.",
  "The future holds all kinds of pleasant surprises.",
  "I trust in my ability to create a fabulous future.",
  "I let go of worries and replace them with excitement, hope and optimism.",
  "I have all it takes to make my dreams a reality.",
  "New and exciting opportunities manifest in my life all the time.",
  "I always find ways to get back on track.",
  "I believe in my ability to set myself free.",
  "I am in control of my life.",
  "I believe in my ability to gain valuable insights from this situation.",
  "I have faith in my ability to pursue my dreams no matter what.",
  "My family and friends support me, even if they don’t share my dreams.",
  "I help others to accomplish their dreams.",
  "I have compassion when others don’t understand my dreams.",
  "I have all the support and help I need.",
  "I am successful in whatever I do.",
  "Failure teaches me how I can become successful in life.",
  "I leave no stone unturned to be successful.",
  "I attract success.",
  "I am pursuing my own definition of success.",
  "I get better with each day. Practice helps me to attain greatness.",
  "I believe in my ability to overcome drawbacks.",
  "I replace unconstructive criticism with encouraging support.",
  "Perfection can be found in all my flaws.",
  "I always give my best and am a good-hearted person."
]
export class TrashCommand extends Command {

  public attempt(context: ReplyContext) {

    const match = context.sourceMessage.text.match(TRASH_REGEX)
    if (match) {

      context.replyPublic(AFFIRMATIONS[Math.floor(Math.random() * AFFIRMATIONS.length)])

      return true
    } else if ( context.sourceMessage.text.match(DROP_REGEX) ){
      context.replyPublic(`
\`\`\`
                                                                     
          ((((                                                       
          (((((                                                      
           (((((                                                     
         /(/((((            (         .//                *(/         
     ((((((((((((      ((((((,    (((((((((((        (((((((((((     
   (((((((((((((((   ((((((((    ((((((((((((((    (((((((((((((((   
  (((((       (((((  ((((       ((((       (((((  (((((       (((((  
  ((((         ((((  (((((     ((((/        ((((  ((((         ((((  
  ((((        (((((   ((((/    (((((        ((((  (((((        ((((  
   (((((     (((((     ((((     (((((,    ((((((   (((((     (((((   
    (((((((((((((      (((((     (((((((((((((      (((((((((((((    
       (((((((          (((         ((((((((        ((((((((((       
                                                     ((((,           
                                                      ((((           
                                                       ((((          
                                                       ((            
\`\`\`
      `)

      return true
    } else {
      return false
    }
  }

}
