import { AlphabetDL } from './../constants/AlphabetDL';
import { FSM } from 'k4ycer-lexer';
import { StatesDL } from '../constants/StatesDL';

export class FSMDl extends FSM{
    constructor(){
        let alphabet: string[] = Object.keys(AlphabetDL).map(k => AlphabetDL[k as any]);
        let states: number[] = FSM.EnumToArray(StatesDL);
        let initialState: number = StatesDL.Initial;
        let acceptingStates: number[] = [StatesDL.IdentifierStart, StatesDL.IdentifierPart, StatesDL.Exclamation, StatesDL.ExclamationEqualsEquals, StatesDL.ExclamationEquals, StatesDL.StringLiteralEnd, StatesDL.Percent, StatesDL.Ampersand, StatesDL.AmpersandAmpersand, StatesDL.OpenParen, StatesDL.CloseParen, StatesDL.Asterisk, StatesDL.Plus, StatesDL.PlusPlus, StatesDL.Comma, StatesDL.Minus, StatesDL.Entero, StatesDL.Slash, StatesDL.SingleLineComment, StatesDL.MultiLineCommentPart, StatesDL.MultiLineCommentEndStart, StatesDL.MultiLineCommentEnd, StatesDL.Semicolon, StatesDL.LessThan, StatesDL.LessThanEquals, StatesDL.Equals, StatesDL.EqualsEquals, StatesDL.GreaterThan, StatesDL.OpenBracket, StatesDL.CloseBracket, StatesDL.OpenBrace, StatesDL.CloseBrace, StatesDL.Bar, StatesDL.BarBar, StatesDL.WhiteSpace, StatesDL.EndOfLine, StatesDL.GreaterThanEquals, StatesDL.MinusMinus, StatesDL.CharacterLiteralEnd];

        super(alphabet, states, initialState, acceptingStates);
    }

    buildTransitionTable(){
        // Line feed, carriage return
        this.addTransition(StatesDL.Initial, StatesDL.EndOfLine, AlphabetDL.carriageReturn);
        this.addTransition(StatesDL.Initial, StatesDL.EndOfLine, AlphabetDL.lineFeed);
        this.addTransition(StatesDL.EndOfLine, StatesDL.EndOfLine, AlphabetDL.lineFeed);

        // Whitespace
        this.addTransition(StatesDL.Initial, StatesDL.WhiteSpace, AlphabetDL.tab);
        this.addTransition(StatesDL.Initial, StatesDL.WhiteSpace, AlphabetDL.verticalTab);
        this.addTransition(StatesDL.Initial, StatesDL.WhiteSpace, AlphabetDL.formFeed);
        this.addTransition(StatesDL.Initial, StatesDL.WhiteSpace, AlphabetDL.space);

        //Identifiers
        let identifierStartInputs = [AlphabetDL.A, AlphabetDL.B, AlphabetDL.C, AlphabetDL.D, AlphabetDL.E, AlphabetDL.F, AlphabetDL.G, AlphabetDL.H, AlphabetDL.I, AlphabetDL.J, AlphabetDL.K, AlphabetDL.L, AlphabetDL.M, AlphabetDL.N, AlphabetDL.O, AlphabetDL.P, AlphabetDL.Q, AlphabetDL.R, AlphabetDL.S, AlphabetDL.T, AlphabetDL.U, AlphabetDL.V, AlphabetDL.W, AlphabetDL.X, AlphabetDL.Y, AlphabetDL.Z, AlphabetDL.a, AlphabetDL.b, AlphabetDL.c, AlphabetDL.d, AlphabetDL.e, AlphabetDL.f, AlphabetDL.g, AlphabetDL.h, AlphabetDL.i, AlphabetDL.j, AlphabetDL.k, AlphabetDL.l, AlphabetDL.m, AlphabetDL.n, AlphabetDL.o, AlphabetDL.p, AlphabetDL.q, AlphabetDL.r, AlphabetDL.s, AlphabetDL.t, AlphabetDL.u, AlphabetDL.v, AlphabetDL.w, AlphabetDL.x, AlphabetDL.y, AlphabetDL.z];
        let identifierPartInputs = identifierStartInputs.concat([AlphabetDL._0, AlphabetDL._1, AlphabetDL._2, AlphabetDL._3, AlphabetDL._4, AlphabetDL._5, AlphabetDL._6, AlphabetDL._7, AlphabetDL._8, AlphabetDL._9, AlphabetDL._]);        
        this.addTransitionMultipleInputs(StatesDL.Initial, StatesDL.IdentifierStart, identifierStartInputs);
        this.addTransitionMultipleInputs(StatesDL.IdentifierStart, StatesDL.IdentifierPart, identifierPartInputs);
        this.addTransitionMultipleInputs(StatesDL.IdentifierPart,StatesDL.IdentifierPart, identifierPartInputs);

        // Exclamation
        this.addTransition(StatesDL.Initial, StatesDL.Exclamation, AlphabetDL.exclamation);
        this.addTransition(StatesDL.Exclamation, StatesDL.ExclamationEquals, AlphabetDL.equals);
        this.addTransition(StatesDL.ExclamationEquals, StatesDL.ExclamationEqualsEquals, AlphabetDL.equals);

        // String Literal
        this.addTransition(StatesDL.Initial, StatesDL.StringLiteralPart, AlphabetDL.doubleQuote);
        this.addTransitionAllInputs(StatesDL.StringLiteralPart, StatesDL.StringLiteralPart);        
        this.addTransition(StatesDL.StringLiteralPart, StatesDL.StringLiteralEnd, AlphabetDL.doubleQuote);
        this.addTransition(StatesDL.StringLiteralPart, -1, AlphabetDL.lineFeed);
        this.addTransition(StatesDL.StringLiteralPart, -1, AlphabetDL.carriageReturn);        

        // Escape string inside string literal
        this.addTransition(StatesDL.StringLiteralPart, StatesDL.EscapeStringInStringLiteral, AlphabetDL.backslash);
        this.addTransitionAllInputs(StatesDL.EscapeStringInStringLiteral, StatesDL.StringLiteralPart);

        this.addTransition(StatesDL.StringLiteralPart, StatesDL.EscapeStringInStringLiteral, AlphabetDL.singleQuote);
        this.addTransition(StatesDL.EscapeStringInStringLiteral, StatesDL.EscapeStringInStringLiteral, AlphabetDL.backslash);
        this.addTransitionAllInputs(StatesDL.EscapeStringInStringLiteral, StatesDL.EscapeStringInStringLiteral);
        this.addTransition(StatesDL.EscapeStringInStringLiteral, StatesDL.StringLiteralPart, AlphabetDL.singleQuote);

        

        // Character literal
        this.addTransition(StatesDL.Initial, StatesDL.CharacterLiteralStart, AlphabetDL.singleQuote);
        this.addTransitionAllInputs(StatesDL.CharacterLiteralStart, StatesDL.CharacterLiteralPart);
        this.addTransition(StatesDL.CharacterLiteralPart, -1, AlphabetDL.lineFeed);
        this.addTransition(StatesDL.CharacterLiteralPart, -1, AlphabetDL.carriageReturn);        
        this.addTransition(StatesDL.CharacterLiteralPart, StatesDL.CharacterLiteralEnd, AlphabetDL.singleQuote);

        // Escape string inside char literal
        this.addTransition(StatesDL.CharacterLiteralStart, StatesDL.EscapeStringInCharLiteral, AlphabetDL.backslash);
        this.addTransitionAllInputs(StatesDL.EscapeStringInCharLiteral, StatesDL.CharacterLiteralPart);

        // Percent
        this.addTransition(StatesDL.Initial, StatesDL.Percent, AlphabetDL.percent);

        // Ampersand
        this.addTransition(StatesDL.Initial, StatesDL.Ampersand, AlphabetDL.ampersand);
        this.addTransition(StatesDL.Ampersand, StatesDL.AmpersandAmpersand, AlphabetDL.ampersand);

        // Open Paren
        this.addTransition(StatesDL.Initial, StatesDL.OpenParen, AlphabetDL.openParen);

        // Close Paren
        this.addTransition(StatesDL.Initial, StatesDL.CloseParen, AlphabetDL.closeParen);

        // Asterisk
        this.addTransition(StatesDL.Initial, StatesDL.Asterisk, AlphabetDL.asterisk);

        // Plus
        this.addTransition(StatesDL.Initial, StatesDL.Plus, AlphabetDL.plus);
        this.addTransition(StatesDL.Plus, StatesDL.PlusPlus, AlphabetDL.plus);

        // Comma
        this.addTransition(StatesDL.Initial, StatesDL.Comma, AlphabetDL.comma);

        // Minus
        this.addTransition(StatesDL.Initial, StatesDL.Minus, AlphabetDL.minus);
        this.addTransition(StatesDL.Minus, StatesDL.MinusMinus, AlphabetDL.minus);

        // Minus numeric literal
        this.addTransitionMultipleInputs(StatesDL.Minus, StatesDL.Entero, [AlphabetDL._0, AlphabetDL._1, AlphabetDL._2, AlphabetDL._3, AlphabetDL._4, AlphabetDL._5, AlphabetDL._6, AlphabetDL._7, AlphabetDL._8, AlphabetDL._9]);

        //Numerical Literal
        this.addTransitionMultipleInputs(StatesDL.Initial, StatesDL.Entero, [AlphabetDL._0, AlphabetDL._1, AlphabetDL._2, AlphabetDL._3, AlphabetDL._4, AlphabetDL._5, AlphabetDL._6, AlphabetDL._7, AlphabetDL._8, AlphabetDL._9]);
        this.addTransitionMultipleInputs(StatesDL.Entero, StatesDL.Entero, [AlphabetDL._0, AlphabetDL._1, AlphabetDL._2, AlphabetDL._3, AlphabetDL._4, AlphabetDL._5, AlphabetDL._6, AlphabetDL._7, AlphabetDL._8, AlphabetDL._9]);

        // Slash
        this.addTransition(StatesDL.Initial, StatesDL.Slash, AlphabetDL.slash);
        this.addTransition(StatesDL.Slash, StatesDL.SingleLineComment, AlphabetDL.slash);
        this.addTransition(StatesDL.Slash, StatesDL.MultiLineCommentPart, AlphabetDL.asterisk);

        // Single line comment
        this.addTransitionAllInputs(StatesDL.SingleLineComment, StatesDL.SingleLineComment);
        this.addTransitionMultipleInputs(StatesDL.SingleLineComment, -1, [AlphabetDL.lineFeed, AlphabetDL.carriageReturn]);        

        // Multi line comment
        this.addTransitionAllInputs(StatesDL.MultiLineCommentPart, StatesDL.MultiLineCommentPart);
        this.addTransition(StatesDL.MultiLineCommentPart, StatesDL.MultiLineCommentEndStart, AlphabetDL.asterisk);
        this.addTransitionAllInputs(StatesDL.MultiLineCommentEndStart, StatesDL.MultiLineCommentPart);
        this.addTransition(StatesDL.MultiLineCommentEndStart, StatesDL.MultiLineCommentEnd, AlphabetDL.slash);
        this.addTransitionAllInputs(StatesDL.MultiLineCommentEnd, -1);

        // Semicolon
        this.addTransition(StatesDL.Initial, StatesDL.Semicolon, AlphabetDL.semicolon);

        // Less than
        this.addTransition(StatesDL.Initial, StatesDL.LessThan, AlphabetDL.lessThan);
        this.addTransition(StatesDL.LessThan, StatesDL.LessThanEquals, AlphabetDL.equals);

        // Equals
        this.addTransition(StatesDL.Initial, StatesDL.Equals, AlphabetDL.equals);
        this.addTransition(StatesDL.Equals, StatesDL.EqualsEquals, AlphabetDL.equals);

        // Greater than
        this.addTransition(StatesDL.Initial, StatesDL.GreaterThan, AlphabetDL.greaterThan);
        this.addTransition(StatesDL.GreaterThan, StatesDL.GreaterThanEquals, AlphabetDL.equals);

        // Open bracket
        this.addTransition(StatesDL.Initial, StatesDL.OpenBracket, AlphabetDL.openBracket);

        // Close bracket
        this.addTransition(StatesDL.Initial, StatesDL.CloseBracket, AlphabetDL.closeBracket);

        // Open brace
        this.addTransition(StatesDL.Initial, StatesDL.OpenBrace, AlphabetDL.openBrace);

        // Close brace
        this.addTransition(StatesDL.Initial, StatesDL.CloseBrace, AlphabetDL.closeBrace);

        // Bar
        this.addTransition(StatesDL.Initial, StatesDL.Bar, AlphabetDL.bar);        
        this.addTransition(StatesDL.Bar, StatesDL.BarBar, AlphabetDL.bar);        
    }
}