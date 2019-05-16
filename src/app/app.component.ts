import { TokenTypes } from './model/constants/TokenTypes';
import { LexerDL } from './model/classes/LexerDL';
import { Component } from '@angular/core';
import { Token } from 'k4ycer-lexer';
import { SyntacticAnalyzerDL, entries } from './model/classes/SyntacticAnalyzerDL';
import {TreeMap} from './model/classes/TreeMap';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'Deeplingo Compiler';

	lexer: LexerDL;
	syntacticAnalyzer: SyntacticAnalyzerDL;
	treeMap: TreeMap;
	public input: string;

	ngOnInit(){
		this.lexer = new LexerDL("");
		this.syntacticAnalyzer = new SyntacticAnalyzerDL([]);
		this.treeMap = new TreeMap();
	}

	readFile(e){
		let file = e.target.files[0];
		if(!file){
			return;
		}

		let reader = new FileReader();
		reader.onload = (ef) => {
			this.input = (<any>ef).target.result;
			this.compile(this.input);
		}
		reader.readAsText(file);
	}	

	checkMain(){
        
	}
	checkIfDuplicateExists(w){
		return new Set(w).size !== w.length 
	}
	filterids(tokens) {
		return tokens.value == "IdentifierDingo";
	}
	filterfuns(tokens) {
		return tokens.Fun == 1;
	}
	compile(input: string){
		let tokens: Token[];

		this.lexer.setInput(input);
		try{
			tokens = this.lexer.tokenize();		
		}catch(e){
			console.log("Error en analizador lexico: " + e.message );
			return
		}	

		// Add $ token at the end        
		tokens.push(new Token(TokenTypes.PesoToken, TokenTypes[TokenTypes.PesoToken], "$", null, null));
		
		console.log("Input: ", input);
		console.log("Tokens: ", tokens);

		this.syntacticAnalyzer.setTokens(tokens);

		try{
			this.syntacticAnalyzer.analyze();
			console.log("Sintacticamente valido");
			//console.log(entries);
			console.log(this.treeMap.list_to_tree(entries));

			if(tokens.find(s => s.value == "main")){
				console.log("Se encontro la funcion main");
			}else{
				console.log("No se encontro la funcion main");
			}

		
			
			var filtered = tokens.filter(this.filterids);

			if(this.checkIfDuplicateExists(filtered)){
				console.log("Se encontraron duplicados");
			}else{
                console.log("No se encontraron variables duplicadas");
			}

			var filtered2 = tokens.filter(this.filterfuns);

			if(this.checkIfDuplicateExists(filtered2)){
				console.log("Se encontraron funciones duplicadas");
			}else{
                console.log("No se encontraron funciones duplicadas");
			}
			console.log("Tokens: ", tokens);

			

		}catch(e){
			console.log("Error en analizador sintáctico: " + e.message );
			return;
		}
		//console.log(entries);
			
	}
}
