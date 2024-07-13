import { Colors } from "@/lib/models";

export const getRandomSarcasticQuote = (
  username: string,
  amountBets: string,
  color: Colors
) => {
  const quotes = [
    `${username} bets ${amountBets} on ${color}. A true visionary of our time.`,
    `Look out, Vegas! ${username}'s unstoppable ${color} strategy is coming for you.`,
    `${username} puts ${amountBets} on ${color}. What could possibly go wrong?`,
    `Ah, ${username}'s planning for early retirement with that ${color} bet. Genius.`,
    `${username}'s ${color} choice? Clearly based on years of statistical analysis.`,
    `${username} goes all in on ${color}. I'm sure Lady Luck is taking notes.`,
    `${amountBets} on ${color}? ${username}'s living life on the edge... of reason.`,
    `${username}'s betting ${amountBets} on ${color}. A tale for the grandkids, surely.`,
    `${username} trusts in ${color}. Because who needs a savings account anyway?`,
    `${username}'s ${color} bet: turning ${amountBets} into a life lesson in 3... 2... 1...`,
    `${username}'s financial advisor must be so proud of this ${color} strategy.`,
    `${username} chooses ${color}. Clearly, they've cracked the code of random chance.`,
    `Watch as ${username} turns ${amountBets} into a fond memory on ${color}.`,
    `${username}'s bet on ${color}: because who doesn't love a good adrenaline rush?`,
    `${username}'s putting ${amountBets} on ${color}. I hear NASA's taking notes.`,
    `A moment of silence for ${username}'s ${amountBets} as it ventures into the ${color} unknown.`,
    `${username}'s ${color} strategy: redefining 'high risk, high reward' since now.`,
    `${username} bets on ${color}. I'm sure the casino's quaking in its boots.`,
    `${username}'s ${amountBets} on ${color}: a masterclass in probability manipulation.`,
    `Look at ${username} go! Betting ${amountBets} on ${color} like tomorrow doesn't exist.`,
    `${username}'s ${color} bet: turning gambling into an extreme sport.`,
    `${username} trusts ${color} with ${amountBets}. What a time to be alive.`,
    `${username}'s about to make history with this ${color} bet. Or is it tragedy?`,
    `${username} chooses ${color}. Because life's too long to play it safe, right?`,
    `${username}'s ${amountBets} on ${color}: a bold move in the face of reason.`,
    `Watch ${username} defy logic with this daring ${color} strategy.`,
    `${username}'s betting ${amountBets} on ${color}. I'm sure it's part of a larger, genius plan.`,
    `${username} goes for ${color}. Who needs math when you have gut feeling?`,
    `${username}'s ${color} choice: turning gambling into an art form.`,
    `${username} bets ${amountBets} on ${color}. Future economists will study this moment.`,
    `Look at ${username} go, making ${color} the new black with that ${amountBets} bet.`,
    `${username}'s strategy: bet ${amountBets} on ${color} and hope for the best. Flawless.`,
    `${username} picks ${color}. Because random chance respects confidence, right?`,
    `${username}'s ${amountBets} says ${color} is the way to go. Who are we to argue with such logic?`,
    `${username} bets on ${color}. I'm sure it's based on a complex algorithm... or a coin flip.`,
    `${username}'s ${color} bet: proving that hope springs eternal.`,
    `Watch as ${username} turns ${amountBets} into an important life lesson on ${color}.`,
    `${username} trusts in ${color}. Because who doesn't love a good plot twist?`,
    `${username}'s betting strategy: Go ${color} or go home. Literally.`,
    `${username} chooses ${color}. Clearly, they've unlocked the secrets of the universe.`,
  ];

  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
};
