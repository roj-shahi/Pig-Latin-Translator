import { Component, OnInit } from '@angular/core';
import { Translation } from './translation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
	
	userText: string = '';
	vowels = ['a', 'e', 'i', 'o', 'u'];
	result: Translation = {
		text: 'test',
		translation: 'esttay'
	};
	resultHistory: Translation[] = [];

	//Find the first vowel position in a word then returns it's position
	getVowelPos = function(word: string): number {
		const pos = word.split('').findIndex((char) => this.vowels.includes(char));
		return (pos === -1 ? 0 : pos);
	}

	//Get the value from input textbox, split into words and translate, put them back together
	translate(): void {
		if ( ! this.userText.length ) {
	      return;
	    }

		const userText  = this.userText.toLowerCase(),
				translatedWords: string[] = [],
				splitSentence = userText.split(' '); //split into words

		//translate each word
		for(let word of splitSentence) {
			translatedWords.push(this.getTranslatedWord(word));
		}
		
		this.result = {
						text: this.userText,
						translation: translatedWords.join(' ')
					};

		this.updateHistory(this.result);
		this.userText = '';

	}

	//Translate the word and return translated text
	getTranslatedWord(word:string): string {
		const vowelPos = this.getVowelPos(word);
		const startsWithConsonant: string =  word.slice(0, vowelPos);
		const startsWithVowel: string = word.slice(vowelPos);

		const suffix = vowelPos > 0 ? 'ay' : 'way';

		return (startsWithVowel + startsWithConsonant + suffix);
	}

	//Retain into resultHistory upto last 10 translation
	updateHistory(result: Translation): void {
		if(this.resultHistory.length >= 10) {
			//first out if already 10
			this.resultHistory.splice(0, 1);
		}

		this.resultHistory.push(result);
	}

	ngOnInit() {
  	}

}
