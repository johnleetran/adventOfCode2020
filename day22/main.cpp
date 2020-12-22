#include <iostream>
#include <fstream>
#include <deque>
#include <regex>
#include <string>
#include <algorithm>
#include <numeric>
#include <set>
#include <sstream>

int numGames = 0;

struct Winner{
    std::deque<int> cards;
    std::string winner;
};

std::string join(std::deque<int> v){
    std::ostringstream os;
    for (int i: v) {
        os << i;
    }
    std::string str(os.str());
    //std::cout << str;

    return std::move(str);
}

Winner play(std::deque<int> &player1, std::deque<int> &player2, std::set<std::string> seen){
    Winner winner{};
    while (player1.size() != 0 && player2.size() != 0) {
        //std::cout << "howmany" << std::endl;
        std::string cardHand1 = join(player1);
        std::string cardHand2 = join(player2);

        if (seen.find(cardHand1) != seen.end() || seen.find(cardHand2) != seen.end()){
            std::cout << "numGames: " << numGames << "player1 wins" << std::endl;
            numGames += 1;
            return Winner{player1, "player1"};
        }
        seen.insert(cardHand1);
        seen.insert(cardHand2);
        

        int card1 = player1.front(); player1.pop_front();
        int card2 = player2.front(); player2.pop_front();

        if(player1.size() >= card1 && player2.size() >= card2){
            std::deque<int> p1 = player1;
            //std::copy(std::begin(player1), std::end(player1), std::begin(p1));

            std::deque<int> p2 = player2;
            //std::copy(std::begin(player2), std::end(player2), std::begin(p2));

            std::set<std::string> newSeen{};
            winner = play(p1, p2, newSeen);
        }else{
            if (card1 > card2) {
                winner.winner = "player1";
            }else{
                winner.winner = "player2";
            }
        }

        if (winner.winner == "player1"){
            player1.push_back(card1);
            player1.push_back(card2);
        } else {
            player2.push_back(card2);
            player2.push_back(card1);
        }
    }
    if (player1.size() == 0){
        winner.cards = player2; 
        winner.winner = "player2";
    }else{
        winner.cards = player1; 
        winner.winner = "player1";
    }
    return winner;
}

int main(){
    std::deque<int> player1 = {7,1,9,10,12,4,38,22,18,3,27,31,43,33,47,42,21,24,50,39,8,6,16,46,11};
    std::deque<int> player2 = {49,41,40,35,44,29,30,19,14,2,34,17,25,5,15,32,20,48,45,26,37,28,36,23,13};

    std::set<std::string> seen{};
    Winner winner = play(player1, player2, seen);
    int answer = 0;
    int scoring = winner.cards.size();
    for (auto s : winner.cards) {
        answer += scoring * +s;
        scoring -= 1;
    }
    std::cout <<answer << std::endl;
}

