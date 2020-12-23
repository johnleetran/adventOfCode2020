#include <iostream>
#include <fstream>
#include <vector>
#include <regex>
#include <string>
#include <algorithm>

using namespace std;

class MyInteger{
  public:
  int64_t val = 0;
  std::string oper = "";

  MyInteger(){ val = 0; }
  MyInteger(int64_t v) : val(v) {}

  MyInteger(const std::string &c) : oper(c) {}

  MyInteger( const MyInteger &obj){
    this->val = obj.val;
    this->oper = obj.oper;
  };
  MyInteger( MyInteger &&obj) = default;

  ~MyInteger() = default;

  MyInteger operator+(MyInteger m){
    return MyInteger{this->val + m.val};
  }

  MyInteger operator*(MyInteger m){
    return MyInteger{this->val * m.val};
  }

  MyInteger& operator=(const MyInteger& m) = default;
  friend ostream& operator<<(ostream& os, const MyInteger& dt){
    os << dt.val;
    return os;
  }
};

MyInteger evaluate_expr(vector<MyInteger> &stack){
  MyInteger result{0};
  if(stack.size() > 0){
    result.val = stack.back().val;
    stack.pop_back();
  }

  while(stack.size() > 0 && stack.back().oper != ")"){
    MyInteger sign {stack.back()}; stack.pop_back();

    if(sign.oper == "+"){
      result = result + stack.back(); stack.pop_back();
    }else if(sign.oper == "*"){
      result = result * stack.back(); stack.pop_back();
    }
  }

  if(stack.size() > 0){
    stack.pop_back();
  }
  return result;
}

MyInteger calculate(std::string s){
  MyInteger operand{0};
  int64_t n = 0;
  vector<MyInteger> stack{};
  for(int i=s.size() -1; i>=0; --i){
    std::string ch = string{s[i]};
    std::regex num_regex("\\d+");
    if(regex_match (ch, regex("\\d+"))){
      operand.val = atoi(ch.c_str()) + operand.val;
      n += 1;
    }else if(!regex_match (ch, regex("\\s+"))){
      if(n != 0){
        MyInteger tmp{operand.val};
        //tmp.oper = ch;
        stack.push_back(std::move(tmp));
        n = 0;
        operand.val = 0;
      }
      if(ch == "("){
        MyInteger result {evaluate_expr(stack)};
        stack.push_back(std::move(result));
        operand.val = 0;
        n = 0;
      }else{
        MyInteger c{ch};
        c.oper = ch;
        stack.push_back(std::move(c));
      }
    }
  }
  if (n !=0) {
    stack.push_back(std::move(operand));
  }
  MyInteger a = evaluate_expr(stack);
  return a;
} 

int main () {
  // MyInteger a(3);
  // MyInteger b(7);
  // MyInteger c(1);

  // std::cout << (a + b * c) << std::endl;
  MyInteger sum{0};
  string line;
  ifstream myfile ("/Users/john/Documents/code/advent-of-code-2020/day18/input.txt");
  if (myfile.is_open())
  {
    while ( getline (myfile,line) )
    {
      
      cout << line << '\n';
      sum = sum + calculate(line);
    }
    myfile.close();
  }
  std::cout << sum << std::endl;
  return 0;
}
