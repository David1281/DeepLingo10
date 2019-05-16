import { AlphabetDL } from './../constants/AlphabetDL';
import { StatesDL } from '../constants/StatesDL';
import { FSMDl } from './FSMDL';
import { Lexer, FSM, Token } from 'k4ycer-lexer';
import { TokenTypes } from '../constants/TokenTypes';
import { TextToToken } from '../constants/TextToToken';

export class LexerDL extends Lexer{
    constructor(input: string){
        super(input, new FSMDl(), TokenTypes.EndOfFileToken, [TokenTypes.SingleLineCommentTriviaDingo, TokenTypes.MultiLineCommentTriviaDingo, TokenTypes.EndOfFileToken, TokenTypes.WhiteSpace, TokenTypes.NewLineTrivia]);
    }

    recognizeToken(accepted: boolean, analyzedString: string, acceptingState: number): Token{
        let tokenType = TextToToken[analyzedString]; 
        let token;        

        // Integer literal
        if(acceptingState == StatesDL.Entero){
            token = new Token(TokenTypes.IntegerLiteralDingo, TokenTypes[TokenTypes.IntegerLiteralDingo], analyzedString, this.line, this.column);            
            return token;
        }

        // String literal
        if(acceptingState == StatesDL.StringLiteralEnd){
            token = new Token(TokenTypes.StringLiteralDingo, TokenTypes[TokenTypes.StringLiteralDingo], analyzedString, this.line, this.column);            
            return token;
        }

        // Character literal
        if(acceptingState == StatesDL.CharacterLiteralEnd){
            token = new Token(TokenTypes.CharacterLiteralDingo, TokenTypes[TokenTypes.CharacterLiteralDingo], analyzedString, this.line, this.column);            
            return token;
        }

        // End of line
        if(acceptingState == StatesDL.EndOfLine){
            token = new Token(TokenTypes.NewLineTrivia, TokenTypes[TokenTypes.NewLineTrivia], analyzedString, this.line, this.column);
            return token;
        }

        // Single line comment
        if(acceptingState == StatesDL.SingleLineComment){
            token = new Token(TokenTypes.SingleLineCommentTriviaDingo, TokenTypes[TokenTypes.SingleLineCommentTriviaDingo], analyzedString, this.line, this.column);
            
            return token;
        }

        // Multi line comment
        if(acceptingState == StatesDL.MultiLineCommentEnd){
            token = new Token(TokenTypes.MultiLineCommentTriviaDingo, TokenTypes[TokenTypes.MultiLineCommentTriviaDingo], analyzedString, this.line, this.column);            

            return token;
        }

        // Identifier or other token
        if(tokenType == null || tokenType == undefined){
            token = new Token(TokenTypes.IdentifierDingo, TokenTypes[TokenTypes.IdentifierDingo], analyzedString, this.line, this.column);                
        }else{
            token = new Token(tokenType, TokenTypes[tokenType], analyzedString, this.line, this.column);
        }

        return token;
    }

    increasePointers(token: Token){
        if(token.type == TokenTypes.NewLineTrivia){
            this.line++;
            this.column = 0;
            this.position += token.value.length;
        }else if(token.type == TokenTypes.MultiLineCommentTriviaDingo){
            this.position += token.value.length;
            this.column += token.value.length;
            this.line += this.getLineBreaksFromMultilineComment(token.value);
        }else{
            this.column += token.value.length;
            this.position += token.value.length;
        }        
    }    

    private getLineBreaksFromMultilineComment(comment: string): number {
        let position: number = 0;
        let lineBreaks = 0;
        
        while(position < comment.length){
            if(comment.charAt(position) == AlphabetDL.carriageReturn || comment.charAt(position) == AlphabetDL.lineFeed){
                lineBreaks++;
            }
            position++;
        }

        return lineBreaks;
    }
}