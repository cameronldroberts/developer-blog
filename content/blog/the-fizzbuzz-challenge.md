---
path: FizzBuzz
date: 2020-05-30T17:07:00.399Z
title: The FizzBuzz challenge
description: The popular FizzBuzz programming challenge.
---
This is my attempt at the popular FizzBuzz challenge in Go. The code can be found [here ](https://github.com/cameronldroberts/FizzBuzz)

```go
package fizzbuzz

import (
	"fmt"
)

func main() {
	fmt.Println("The FizzBuzz challenge")
	fizzbuzz()
}

func fizzbuzz() {
	for i := 1; i < 101; i++ {
		if i%3 == 0 {
			fmt.Print("Fizz")
		}
		if i%5 == 0 {
			fmt.Print("Buzz")
		}
		if i%3 != 0 && i%5 != 0 {
			fmt.Print(i)
		}
		fmt.Print("\n")
	}
}
```