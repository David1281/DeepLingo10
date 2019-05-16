import { TokenTypes } from './../constants/TokenTypes';
import { SyntacticAnalyzer, Token } from 'k4ycer-syntactic-analyzer';


let stack = [];
let ind = 0;
let scopeCount = 0;
export let entries = [ ];
       

export class SyntacticAnalyzerDL extends SyntacticAnalyzer{
    constructor(tokens: Token[]){        
        super(tokens);
        this.setInitialRule(this.Program);
        
    }
    
    private A(id/*o*/){
        //stack.push("A");
        //console.log(stack);
        let aux = id;
        let aux2 = id + 1
        entries.push({
            "id": aux2,
            "parentId": aux,
            "state": "A"
            });

        switch(this.currentToken.type){
            case TokenTypes.IdentifierDingo:
                this.Def(aux2/*o*/);
                this.A(aux2/*o*/);
                break;
            case TokenTypes.VarDingoKeyword:
                this.Def(aux2/*o*/);
                this.A(aux2/*o*/);
                break;
            case TokenTypes.PesoToken:
                return;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }

    private Array(id/*o*/){
        //stack.push("Array");
        //console.log(stack);

        let aux = id;
        let aux2 = id + 1
        entries.push({
            "id": aux2,
            "parentId": aux,
            "state": "Array"
            });

        switch(this.currentToken.type){
            case TokenTypes.OpenBracketDingoToken:
                //stack.push(TokenTypes.OpenBracketDingoToken);
                
                let aux3 = aux2;
                let aux4 = aux2 + 1;

                entries.push({
                    "id": aux4,
                    "parentId": aux3,
                    "state": TokenTypes[TokenTypes.OpenBracketDingoToken]
                    });
                
                    this.tokens[ind]["Fun"] = 0;      
                ind++;   
                this.tokens[ind]["Scope"] = scopeCount;
                console.log(this.tokens[ind]);    
                this.consume(TokenTypes.OpenBracketDingoToken);
                
                
                
                this.Exprlist(aux3/*o*/);




                //stack.push(TokenTypes.CloseBracketDingoToken);
                entries.push({
                    "id": aux4 + 1,
                    "parentId": aux3,
                    "state": TokenTypes[TokenTypes.CloseBracketDingoToken]
                    });    
                
                    this.tokens[ind]["Fun"] = 0;
                ind++; 
                this.tokens[ind]["Scope"] = scopeCount;
                console.log(this.tokens[ind]);     
                this.consume(TokenTypes.CloseBracketDingoToken);
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }

    private B(id/*o*/){
        //stack.push("B");
        //console.log(stack);

        let aux = id;
        let aux2 = id + 1
        entries.push({
            "id": aux2,
            "parentId": aux,
            "state": "B"
            });

        switch(this.currentToken.type){
            case TokenTypes.SemicolonDingoToken:
                return;
            case TokenTypes.BreakDingoKeyword:
                return;
            case TokenTypes.IdentifierDingo:
                return;
            case TokenTypes.IfDingoKeyword:
                return;
            case TokenTypes.LoopDingoKeyword:
                return;
            case TokenTypes.CloseBraceDingoToken:
                return;
            case TokenTypes.VarDingoKeyword:
                this.Vardef(aux2/*o*/);
                this.B(aux2/*o*/);
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }

    private C(id/*o*/){
        //stack.push("C");
        //console.log(stack);
        let aux = id;
        let aux2 = id + 1
        entries.push({
            "id": aux2,
            "parentId": aux,
            "state": "C"
            });


        switch(this.currentToken.type){
            case TokenTypes.SemicolonDingoToken:
                this.Stmt(aux2/*o*/);
                this.C(aux2/*o*/);
                break;
            case TokenTypes.BreakDingoKeyword:
                this.Stmt(aux2/*o*/);
                this.C(aux2/*o*/);
                break;
            case TokenTypes.IdentifierDingo:
                this.Stmt(aux2/*o*/);
                this.C(aux2/*o*/);
                break;
            case TokenTypes.IfDingoKeyword:
                this.Stmt(aux2/*o*/);
                this.C(aux2/*o*/);
                break;
            case TokenTypes.LoopDingoKeyword:
                this.Stmt(aux2/*o*/);
                this.C(aux2/*o*/);
                break;
            case TokenTypes.CloseBraceDingoToken:
                return;
            case TokenTypes.ReturnDingoKeyword:
                this.Stmt(aux2/*o*/);
                this.C(aux2/*o*/);
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }

    private D(id/*o*/){
        //stack.push("D");
        //console.log(stack);
        let aux = id;
        let aux2 = id + 1
        entries.push({
            "id": aux2,
            "parentId": aux,
            "state": "D"
            });


        switch(this.currentToken.type){
            case TokenTypes.SemicolonDingoToken:
                return;
            case TokenTypes.BreakDingoKeyword:
                return;
            case TokenTypes.ElseDingoKeyword:
                return;
            case TokenTypes.ElseIfDingoKeyword:

                //stack.push(TokenTypes.ElseIfDingoKeyword);
                let aux3 = aux2;
                let aux4 = aux2 + 1;
                
                                entries.push({
                                    "id": aux4,
                                    "parentId": aux3,
                                    "state": TokenTypes[TokenTypes.ElseIfDingoKeyword]
                                    });
                                    this.tokens[ind]["Fun"] = 0;
                ind++;                     
                this.tokens[ind]["Scope"] = scopeCount;
                console.log(this.tokens[ind]);                 
                this.consume(TokenTypes.ElseIfDingoKeyword);
                
                //stack.push(TokenTypes.OpenParenDingoToken);
                entries.push({
                    "id": aux4 + 1,
                    "parentId": aux3,
                    "state": TokenTypes[TokenTypes.OpenParenDingoToken]
                    });
                    this.tokens[ind]["Fun"] = 0;
                ind++; 
                this.tokens[ind ]["Scope"] = scopeCount;
                console.log(this.tokens[ind ]);   
                this.consume(TokenTypes.OpenParenDingoToken);

                this.Expr(aux3/*o*/);

                
                //stack.push(TokenTypes.CloseParenDingoToken);
                entries.push({
                    "id": aux4 + 2,
                    "parentId": aux3,
                    "state": TokenTypes[TokenTypes.CloseParenDingoToken]
                    });
                    this.tokens[ind]["Fun"] = 0;
                ind++;     
                this.tokens[ind]["Scope"] = scopeCount;
                console.log(this.tokens[ind]);       
                this.consume(TokenTypes.CloseParenDingoToken);

                
                //stack.push(TokenTypes.OpenBraceDingoToken);
                entries.push({
                    "id": aux4 + 3,
                    "parentId": aux3,
                    "state": TokenTypes[TokenTypes.OpenBraceDingoToken]
                    });
                    this.tokens[ind]["Fun"] = 0;
                ind++; 
                scopeCount++;
                this.tokens[ind ]["Scope"] = scopeCount;
                console.log(this.tokens[ind]);       
                this.consume(TokenTypes.OpenBraceDingoToken);
                this.Stmtlist(aux3/*o*/);
                //stack.push(TokenTypes.CloseBraceDingoToken);
                entries.push({
                    "id": aux4 + 4,
                    "parentId": aux3,
                    "state": TokenTypes[TokenTypes.CloseBraceDingoToken]
                    });
                    this.tokens[ind]["Fun"] = 0;
                ind++;     
                this.tokens[ind]["Scope"] = scopeCount;
                console.log(this.tokens[ind]);     
                this.consume(TokenTypes.CloseBraceDingoToken);
                this.D(aux3/*o*/);
                break;
            case TokenTypes.IdentifierDingo:
                return;
            case TokenTypes.IfDingoKeyword:
                return;
            case TokenTypes.LoopDingoKeyword:
                return;
            case TokenTypes.CloseBraceDingoToken:
                return;
            case TokenTypes.ReturnDingoKeyword:
                return;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }

    private Def(id/*o*/){
        //stack.push("Def");
        //console.log(stack);

        let aux = id;
        let aux2 = id + 1

        entries.push({
            "id": aux2,
            "parentId": aux,
            "state": "Def"
            });

        switch(this.currentToken.type){
            case TokenTypes.IdentifierDingo:
                this.Fundef(aux2/*o*/);
                break;
            case TokenTypes.VarDingoKeyword:
                this.Vardef(aux2/*o*/);
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }

    private Deflist(id/*o*/){
        //stack.push("Deflist");
        //console.log(stack);
        let aux = id;
        let aux2 = id + 1
        entries.push({
            "id": aux2,
            "parentId": aux,
            "state": "Deflist"
            });
       
        switch(this.currentToken.type){
            case TokenTypes.IdentifierDingo:
                this.A(aux2/*o*/);
                break;
            case TokenTypes.VarDingoKeyword:
                this.A(aux2/*o*/);
                break;
            case TokenTypes.PesoToken:
                this.A(aux2/*o*/);
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }

    private E(id/*o*/){
        //stack.push("E");
        //console.log(stack);
        let aux = id;
        let aux2 = id + 1
        entries.push({
            "id": aux2,
            "parentId": aux,
            "state": "E"
            });

        switch(this.currentToken.type){
            case TokenTypes.SemicolonDingoToken:
                return;
            case TokenTypes.CommaDingoToken:
                return;
            case TokenTypes.BarBarDingoToken:
                //stack.push(TokenTypes.BarBarDingoToken);
                let aux3 = aux2;
                let aux4 = aux2 + 1;

                entries.push({
                    "id": aux4,
                    "parentId": aux3,
                    "state": TokenTypes[TokenTypes.BarBarDingoToken]
                    });
                    this.tokens[ind]["Fun"] = 0;
                ind++;     
                this.tokens[ind]["Scope"] = scopeCount;
                console.log(this.tokens[ind]);    
                this.consume(TokenTypes.BarBarDingoToken);

                this.Exprand(aux3/*o*/);
                this.E(aux3/*o*/);
                break;
            case TokenTypes.CloseBracketDingoToken:
                return;
            case TokenTypes.CloseParenDingoToken:
                return;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }

    private Else(id/*o*/){
        //stack.push("Else");
        //console.log(stack);
        let aux = id;
        let aux2 = id + 1
        entries.push({
            "id": aux2,
            "parentId": aux,
            "state": "Else"
            });
        switch(this.currentToken.type){
            case TokenTypes.SemicolonDingoToken:
                return;
            case TokenTypes.BreakDingoKeyword:
                return;
            case TokenTypes.ElseDingoKeyword:
                //stack.push(TokenTypes.ElseIfDingoKeyword);
                let aux3 = aux2;
                let aux4 = aux2 + 1;

                entries.push({
                    "id": aux4,
                    "parentId": aux3,
                    "state": TokenTypes[TokenTypes.ElseDingoKeyword]
                    });
                    this.tokens[ind]["Fun"] = 0;
                ind++; 
                this.tokens[ind ]["Scope"] = scopeCount;
                console.log(this.tokens[ind]);    
                this.consume(TokenTypes.ElseDingoKeyword);
                //stack.push(TokenTypes.OpenBraceDingoToken);
                entries.push({
                    "id": aux4 + 1,
                    "parentId": aux3,
                    "state": TokenTypes[TokenTypes.OpenBraceDingoToken]
                    });

                    this.tokens[ind]["Fun"] = 0;
                ind++; 
                scopeCount++;
                this.tokens[ind ]["Scope"] = scopeCount;
                console.log(this.tokens[ind]);        
                this.consume(TokenTypes.OpenBraceDingoToken);
                this.Stmtlist(aux3/*o*/);
                //stack.push(TokenTypes.CloseBraceDingoToken);
                entries.push({
                    "id": aux4 + 2,
                    "parentId": aux3,
                    "state": TokenTypes[TokenTypes.CloseBraceDingoToken]
                    });
                    this.tokens[ind]["Fun"] = 0;
                    ind++; 
                this.tokens[ind]["Scope"] = scopeCount;
                console.log(this.tokens[ind ]);    
                this.consume(TokenTypes.CloseBraceDingoToken);
                break;
            case TokenTypes.IdentifierDingo:
                return;
            case TokenTypes.IfDingoKeyword:
                return;
            case TokenTypes.LoopDingoKeyword:
                return;
            case TokenTypes.CloseBraceDingoToken:
                return;
            case TokenTypes.ReturnDingoKeyword:
                return;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }

    private Elseiflist(id/*o*/){
        //stack.push("Elseiflist");
        //console.log(stack);
        let aux = id;
        let aux2 = id + 1
        entries.push({
            "id": aux2,
            "parentId": aux,
            "state": "Elseiflist"
            });
        switch(this.currentToken.type){
            case TokenTypes.SemicolonDingoToken:
                this.D(aux2/*o*/);
                break;
            case TokenTypes.BreakDingoKeyword:
                this.D(aux2/*o*/);
                break;
            case TokenTypes.ElseDingoKeyword:
                this.D(aux2/*o*/);
                break;
            case TokenTypes.ElseIfDingoKeyword:
                this.D(aux2/*o*/);
                break;
            case TokenTypes.IdentifierDingo:
                this.D(aux2/*o*/);
                break;
            case TokenTypes.IfDingoKeyword:
                this.D(aux2/*o*/);
                break;
            case TokenTypes.LoopDingoKeyword:
                this.D(aux2/*o*/);
                break;
            case TokenTypes.CloseBraceDingoToken:
                this.D(aux2/*o*/);
                break;
            case TokenTypes.ReturnDingoKeyword:
                this.D(aux2/*o*/);
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }

    private Expr(id/*o*/){
        //stack.push("Expr");
        //console.log(stack);
        let aux = id;
        let aux2 = id + 1
        entries.push({
            "id": aux2,
            "parentId": aux,
            "state": "Expr"
            });
        switch(this.currentToken.type){
            case TokenTypes.ExclamationDingoToken:
                this.Expror(aux2/*o*/);
                break;
            case TokenTypes.IdentifierDingo:
                this.Expror(aux2/*o*/);
                break;
            case TokenTypes.OpenBracketDingoToken:
                this.Expror(aux2/*o*/);
                break;
            case TokenTypes.CharacterLiteralDingo:
                this.Expror(aux2/*o*/);
                break;
            case TokenTypes.IntegerLiteralDingo:
                this.Expror(aux2/*o*/);
                break;
            case TokenTypes.StringLiteralDingo:
                this.Expror(aux2/*o*/);
                break;
            case TokenTypes.OpenParenDingoToken:
                this.Expror(aux2/*o*/);
                break;
            case TokenTypes.MinusDingoToken:
                this.Expror(aux2/*o*/);
                break;
            case TokenTypes.PlusDingoToken:
                this.Expror(aux2/*o*/);
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }

    private Expradd(id/*o*/){
        //stack.push("Expradd");
        //console.log(stack);
        let aux = id;
        let aux2 = id + 1
        entries.push({
            "id": aux2,
            "parentId": aux,
            "state": "Expradd"
            });
        switch(this.currentToken.type){
            case TokenTypes.ExclamationDingoToken:
                this.Exprmul(aux2/*o*/);
                this.I(aux2/*o*/);
                break;
            case TokenTypes.IdentifierDingo:
                this.Exprmul(aux2/*o*/);
                this.I(aux2/*o*/);
                break;
            case TokenTypes.OpenBracketDingoToken:
                this.Exprmul(aux2/*o*/);
                this.I(aux2/*o*/);
                break;
            case TokenTypes.CharacterLiteralDingo:
                this.Exprmul(aux2/*o*/);
                this.I(aux2/*o*/);
                break;
            case TokenTypes.IntegerLiteralDingo:
                this.Exprmul(aux2/*o*/);
                this.I(aux2/*o*/);
                break;
            case TokenTypes.StringLiteralDingo:
                this.Exprmul(aux2/*o*/);
                this.I(aux2/*o*/);
                break;
            case TokenTypes.OpenParenDingoToken:
                this.Exprmul(aux2/*o*/);
                this.I(aux2/*o*/);
                break;
            case TokenTypes.MinusDingoToken:
                this.Exprmul(aux2/*o*/);
                this.I(aux2/*o*/);
                break;
            case TokenTypes.PlusDingoToken:
                this.Exprmul(aux2/*o*/);
                this.I(aux2/*o*/);
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }

    private Exprand(id/*o*/){
        //stack.push("Exprand");
        //console.log(stack);
        let aux = id;
        let aux2 = id + 1
        entries.push({
            "id": aux2,
            "parentId": aux,
            "state": "Exprand"
            });
        switch(this.currentToken.type){
            case TokenTypes.ExclamationDingoToken:
                this.Exprcomp(aux2/*o*/);
                this.F(aux2/*o*/);
                break;
            case TokenTypes.IdentifierDingo:
                this.Exprcomp(aux2/*o*/);
                this.F(aux2/*o*/);
                break;
            case TokenTypes.OpenBracketDingoToken:
                this.Exprcomp(aux2/*o*/);
                this.F(aux2/*o*/);
                break;
            case TokenTypes.CharacterLiteralDingo:
                this.Exprcomp(aux2/*o*/);
                this.F(aux2/*o*/);
                break;
            case TokenTypes.IntegerLiteralDingo:
                this.Exprcomp(aux2/*o*/);
                this.F(aux2/*o*/);
                break;
            case TokenTypes.StringLiteralDingo:
                this.Exprcomp(aux2/*o*/);
                this.F(aux2/*o*/);
                break;
            case TokenTypes.OpenParenDingoToken:
                this.Exprcomp(aux2/*o*/);
                this.F(aux2/*o*/);
                break;
            case TokenTypes.MinusDingoToken:
                this.Exprcomp(aux2/*o*/);
                this.F(aux2/*o*/);
                break;
            case TokenTypes.PlusDingoToken:
                this.Exprcomp(aux2/*o*/);
                this.F(aux2/*o*/);
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }

    private Exprcomp(id/*o*/){
        //stack.push("Exprcomp");
        //console.log(stack);
        let aux = id;
        let aux2 = id + 1
        entries.push({
            "id": aux2,
            "parentId": aux,
            "state": "Exprcomp"
            });
        switch(this.currentToken.type){
            case TokenTypes.ExclamationDingoToken:
                this.Exprrel(aux2/*o*/);
                this.G(aux2/*o*/);
                break;
            case TokenTypes.IdentifierDingo:
                this.Exprrel(aux2/*o*/);
                this.G(aux2/*o*/);
                break;
            case TokenTypes.OpenBracketDingoToken:
                this.Exprrel(aux2/*o*/);
                this.G(aux2/*o*/);
                break;
            case TokenTypes.CharacterLiteralDingo:
                this.Exprrel(aux2/*o*/);
                this.G(aux2/*o*/);
                break;
            case TokenTypes.IntegerLiteralDingo:
                this.Exprrel(aux2/*o*/);
                this.G(aux2/*o*/);
                break;
            case TokenTypes.StringLiteralDingo:
                this.Exprrel(aux2/*o*/);
                this.G(aux2/*o*/);
                break;
            case TokenTypes.OpenParenDingoToken:
                this.Exprrel(aux2/*o*/);
                this.G(aux2/*o*/);
                break;
            case TokenTypes.MinusDingoToken:
                this.Exprrel(aux2/*o*/);
                this.G(aux2/*o*/);
                break;
            case TokenTypes.PlusDingoToken:
                this.Exprrel(aux2/*o*/);
                this.G(aux2/*o*/);
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }

    private Exprlist(id/*o*/){
        //stack.push("Exprlist");
        //console.log(stack);
        let aux = id;
        let aux2 = id + 1
        entries.push({
            "id": aux2,
            "parentId": aux,
            "state": "Exprlist"
            });
        switch(this.currentToken.type){
            case TokenTypes.ExclamationDingoToken:
                this.Expr(aux2/*o*/);
                this.Exprlistcont(aux2/*o*/);
                break;
            case TokenTypes.IdentifierDingo:
                this.Expr(aux2/*o*/);
                this.Exprlistcont(aux2/*o*/);
                break;
            case TokenTypes.OpenBracketDingoToken:
                this.Expr(aux2/*o*/);
                this.Exprlistcont(aux2/*o*/);
                break;
            case TokenTypes.CharacterLiteralDingo:
                this.Expr(aux2/*o*/);
                this.Exprlistcont(aux2/*o*/);
                break;
            case TokenTypes.IntegerLiteralDingo:
                this.Expr(aux2/*o*/);
                this.Exprlistcont(aux2/*o*/);
                break;
            case TokenTypes.StringLiteralDingo:
                this.Expr(aux2/*o*/);
                this.Exprlistcont(aux2/*o*/);
                break;
            case TokenTypes.OpenParenDingoToken:
                this.Expr(aux2/*o*/);
                this.Exprlistcont(aux2/*o*/);
                break;
            case TokenTypes.MinusDingoToken:
                this.Expr(aux2/*o*/);
                this.Exprlistcont(aux2/*o*/);
                break;
            case TokenTypes.PlusDingoToken:
                this.Expr(aux2/*o*/);
                this.Exprlistcont(aux2/*o*/);
                break;
            case TokenTypes.CloseBracketDingoToken:
                return;
            case TokenTypes.CloseParenDingoToken:
                return;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }

    private Exprlistcont(id/*o*/){
        //stack.push("Exprlistcont");
        //console.log(stack);
        let aux = id;
        let aux2 = id + 1
        entries.push({
            "id": aux2,
            "parentId": aux,
            "state": "Exprlistcont"
            });
        switch(this.currentToken.type){
            case TokenTypes.CommaDingoToken:
                //stack.push(TokenTypes.CommaDingoToken);
                let aux3 = aux2;
                let aux4 = aux2 + 1;

                entries.push({
                    "id": aux4,
                    "parentId": aux3,
                    "state": TokenTypes[TokenTypes.CommaDingoToken]
                    });
                    this.tokens[ind]["Fun"] = 0;
                    ind++; 
                this.tokens[ind ]["Scope"] = scopeCount;
                console.log(this.tokens[ind]);    
                this.consume(TokenTypes.CommaDingoToken);
                this.Expr(aux3/*o*/);
                this.Exprlistcont(aux3/*o*/);
                break;
            case TokenTypes.CloseBracketDingoToken:
                return;
            case TokenTypes.CloseParenDingoToken:
                return;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }

    private Exprmul(id/*o*/){
        //stack.push("Exprmul");
        //console.log(stack);
        let aux = id;
        let aux2 = id + 1
        entries.push({
            "id": aux2,
            "parentId": aux,
            "state": "Exprmul"
            });

        switch(this.currentToken.type){
            case TokenTypes.ExclamationDingoToken:
                this.Exprunary(aux2/*o*/);
                this.J(aux2/*o*/);
                break;
            case TokenTypes.IdentifierDingo:
                this.Exprunary(aux2/*o*/);
                this.J(aux2/*o*/);
                break;
            case TokenTypes.OpenBracketDingoToken:
                this.Exprunary(aux2/*o*/);
                this.J(aux2/*o*/);
                break;
            case TokenTypes.CharacterLiteralDingo:
                this.Exprunary(aux2/*o*/);
                this.J(aux2/*o*/);
                break;
            case TokenTypes.IntegerLiteralDingo:
                this.Exprunary(aux2/*o*/);
                this.J(aux2/*o*/);
                break;
            case TokenTypes.StringLiteralDingo:
                this.Exprunary(aux2/*o*/);
                this.J(aux2/*o*/);
                break;
            case TokenTypes.OpenParenDingoToken:
                this.Exprunary(aux2/*o*/);
                this.J(aux2/*o*/);
                break;
            case TokenTypes.MinusDingoToken:
                this.Exprunary(aux2/*o*/);
                this.J(aux2/*o*/);
                break;
            case TokenTypes.PlusDingoToken:
                this.Exprunary(aux2/*o*/);
                this.J(aux2/*o*/);
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }

    private Expror(id/*o*/){
        //stack.push("Expror");
        //console.log(stack);
        let aux = id;
        let aux2 = id + 1
        entries.push({
            "id": aux2,
            "parentId": aux,
            "state": "Expror"
            });

        switch(this.currentToken.type){
            case TokenTypes.ExclamationDingoToken:
                this.Exprand(aux2/*o*/);
                this.E(aux2/*o*/);
                break;
            case TokenTypes.IdentifierDingo:
                this.Exprand(aux2/*o*/);
                this.E(aux2/*o*/);
                break;
            case TokenTypes.OpenBracketDingoToken:
                this.Exprand(aux2/*o*/);
                this.E(aux2/*o*/);
                break;
            case TokenTypes.CharacterLiteralDingo:
                this.Exprand(aux2/*o*/);
                this.E(aux2/*o*/);
                break;
            case TokenTypes.IntegerLiteralDingo:
                this.Exprand(aux2/*o*/);
                this.E(aux2/*o*/);
                break;
            case TokenTypes.StringLiteralDingo:
                this.Exprand(aux2/*o*/);
                this.E(aux2/*o*/);
                break;
            case TokenTypes.OpenParenDingoToken:
                this.Exprand(aux2/*o*/);
                this.E(aux2/*o*/);
                break;
            case TokenTypes.MinusDingoToken:
                this.Exprand(aux2/*o*/);
                this.E(aux2/*o*/);
                break;
            case TokenTypes.PlusDingoToken:
                this.Exprand(aux2/*o*/);
                this.E(aux2/*o*/);
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }

    private Exprprimary(id/*o*/){
        //stack.push("Exprprimary");
        //console.log(stack);
        let aux = id;
        let aux2 = id + 1
        entries.push({
            "id": aux2,
            "parentId": aux,
            "state": "Exprprimary"
            });
        switch(this.currentToken.type){
            case TokenTypes.IdentifierDingo:
            let aux3 = aux2;
            let aux4 = aux2 + 1;

                entries.push({
                    "id": aux4,
                    "parentId": aux3,
                    "state": TokenTypes[TokenTypes.IdentifierDingo]
                    });
                //stack.push(TokenTypes.IdentifierDingo);

                this.tokens[ind]["Fun"] = 0;
                ind++; 
                this.tokens[ind ]["Scope"] = scopeCount;
                console.log(this.tokens[ind]);
                this.consume(TokenTypes.IdentifierDingo);
                this.ExprprimaryP(aux3/*o*/);
                break;
            case TokenTypes.OpenBracketDingoToken:
                this.Array(aux3/*o*/);
                break;
            case TokenTypes.CharacterLiteralDingo:
                this.Lit(aux3/*o*/);
                break;
            case TokenTypes.IntegerLiteralDingo:
                this.Lit(aux3/*o*/);
                break;
            case TokenTypes.StringLiteralDingo:
                this.Lit(aux3/*o*/);
                break;
            case TokenTypes.OpenParenDingoToken:
                //stack.push(TokenTypes.OpenParenDingoToken);
                entries.push({
                    "id": aux4,
                    "parentId": aux3,
                    "state": TokenTypes[TokenTypes.OpenParenDingoToken]
                    });
                    this.tokens[ind]["Fun"] = 0;
                    ind++;     
                this.tokens[ind ]["Scope"] = scopeCount;
                console.log(this.tokens[ind]);    
                this.consume(TokenTypes.OpenParenDingoToken);
                this.Expr(aux3/*o*/);
                //stack.push(TokenTypes.CloseParenDingoToken);
                entries.push({
                    "id": aux4 + 1,
                    "parentId": aux3,
                    "state": TokenTypes[TokenTypes.CloseParenDingoToken]
                    });
                    this.tokens[ind]["Fun"] = 0;
                    ind++; 
                this.tokens[ind ]["Scope"] = scopeCount;
                console.log(this.tokens[ind]);
                this.consume(TokenTypes.CloseParenDingoToken);
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }

    private ExprprimaryP(id/*o*/){
        //stack.push("ExprprimaryP");
        //console.log(stack);
        let aux = id;
        let aux2 = id + 1
        entries.push({
            "id": aux2,
            "parentId": aux,
            "state": "ExprprimaryP"
            });
        switch(this.currentToken.type){
            case TokenTypes.SemicolonDingoToken:
                return;
            case TokenTypes.AmpersandAmpersandDingoToken:
                return;
            case TokenTypes.AsteriskDingoToken:
                return;
            case TokenTypes.CommaDingoToken:
                return;
            case TokenTypes.ExclamationEqualsDingoToken:
                return;
            case TokenTypes.EqualsEqualsDingoToken:
                return;
            case TokenTypes.GreaterThanDingoToken:
                return;
            case TokenTypes.GreaterThanEqualsDingoToken:
                return;
            case TokenTypes.LessThanDingoToken:
                return;
            case TokenTypes.LessThanEqualsDingoToken:
                return;
            case TokenTypes.OpenParenDingoToken:
                //stack.push(TokenTypes.OpenParenDingoToken);
                let aux3 = aux2;
                let aux4 = aux2 + 1;
                
                                entries.push({
                                    "id": aux4,
                                    "parentId": aux3,
                                    "state": TokenTypes[TokenTypes.OpenParenDingoToken]
                                    });
                                    this.tokens[ind]["Fun"] = 0;
                ind++;                     
                this.tokens[ind ]["Scope"] = scopeCount;
                console.log(this.tokens[ind]);                    
                this.consume(TokenTypes.OpenParenDingoToken);
                this.Exprlist(aux3/*o*/);
                //stack.push(TokenTypes.CloseParenDingoToken);
                entries.push({
                    "id": aux4 + 1,
                    "parentId": aux3,
                    "state": TokenTypes[TokenTypes.CloseParenDingoToken]
                    });
                    this.tokens[ind]["Fun"] = 0;  
                    ind++;     
                this.tokens[ind ]["Scope"] = scopeCount;
                console.log(this.tokens[ind]);    
                this.consume(TokenTypes.CloseParenDingoToken);
                break;
            case TokenTypes.MinusDingoToken:
                return;
            case TokenTypes.BarBarDingoToken:
                return;
            case TokenTypes.PercentDingoToken:
                return;
            case TokenTypes.PlusDingoToken:
                return;
            case TokenTypes.CloseBracketDingoToken:
                return;
            case TokenTypes.CloseParenDingoToken:
                return;
            case TokenTypes.SlashDingoToken:
                return;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }

    private Exprrel(id/*o*/){
        //stack.push("Exprrel");
        //console.log(stack);
        let aux = id;
        let aux2 = id + 1
        entries.push({
            "id": aux2,
            "parentId": aux,
            "state": "Deflist"
            });
        switch(this.currentToken.type){
            case TokenTypes.ExclamationDingoToken:
                this.Expradd(aux2/*o*/);
                this.H(aux2/*o*/);
                break;
            case TokenTypes.IdentifierDingo:
                this.Expradd(aux2/*o*/);
                this.H(aux2/*o*/);
                break;
            case TokenTypes.OpenBracketDingoToken:
                this.Expradd(aux2/*o*/);
                this.H(aux2/*o*/);
                break;
            case TokenTypes.CharacterLiteralDingo:
                this.Expradd(aux2/*o*/);
                this.H(aux2/*o*/);
                break;
            case TokenTypes.IntegerLiteralDingo:
                this.Expradd(aux2/*o*/);
                this.H(aux2/*o*/);
                break;
            case TokenTypes.StringLiteralDingo:
                this.Expradd(aux2/*o*/);
                this.H(aux2/*o*/);
                break;
            case TokenTypes.OpenParenDingoToken:
                this.Expradd(aux2/*o*/);
                this.H(aux2/*o*/);
                break;
            case TokenTypes.MinusDingoToken:
                this.Expradd(aux2/*o*/);
                this.H(aux2/*o*/);
                break;
            case TokenTypes.PlusDingoToken:
                this.Expradd(aux2/*o*/);
                this.H(aux2/*o*/);
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }

    private Exprunary(id/*o*/){
        //stack.push("Exprunary");
        //console.log(stack);
        let aux = id;
        let aux2 = id + 1
        entries.push({
            "id": aux2,
            "parentId": aux,
            "state": "Exprunary"
            });
        switch(this.currentToken.type){
            case TokenTypes.ExclamationDingoToken:
                this.Opunary(aux2/*o*/);
                this.Exprunary(aux2/*o*/);
                break;
            case TokenTypes.IdentifierDingo:
                this.Exprprimary(aux2/*o*/);
                break;
            case TokenTypes.OpenBracketDingoToken:
                this.Exprprimary(aux2/*o*/);
                break;
            case TokenTypes.CharacterLiteralDingo:
                this.Exprprimary(aux2/*o*/);
                break;
            case TokenTypes.IntegerLiteralDingo:
                this.Exprprimary(aux2/*o*/);
                break;
            case TokenTypes.StringLiteralDingo:
                this.Exprprimary(aux2/*o*/);
                break;
            case TokenTypes.OpenParenDingoToken:
                this.Exprprimary(aux2/*o*/);
                break;
            case TokenTypes.MinusDingoToken:
                this.Opunary(aux2/*o*/);
                this.Exprunary(aux2/*o*/);
                break;
            case TokenTypes.PlusDingoToken:
                this.Opunary(aux2/*o*/);
                this.Exprunary(aux2/*o*/);
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }

    // Funciones Dave:

    
    private F(id/*o*/){
        //stack.push("F");
        //console.log(stack);
        let aux = id;
        let aux2 = id + 1
        entries.push({
            "id": aux2,
            "parentId": aux,
            "state": "F"
            });
        switch(this.currentToken.type){
            case TokenTypes.SemicolonDingoToken:
            case TokenTypes.CommaDingoToken:
            case TokenTypes.BarBarDingoToken:
            case TokenTypes.CloseParenDingoToken:
            case TokenTypes.CloseBracketDingoToken:
            return;

            case TokenTypes.AmpersandAmpersandDingoToken:
                //stack.push(TokenTypes.AmpersandAmpersandDingoToken);
                let aux3 = aux2;
                let aux4 = aux2 + 1;

                entries.push({
                    "id": aux4,
                    "parentId": aux3,
                    "state": TokenTypes[TokenTypes.AmpersandAmpersandDingoToken]
                    });
                    this.tokens[ind]["Fun"] = 0;
                    ind++; 
                this.tokens[ind ]["Scope"] = scopeCount;
                console.log(this.tokens[ind ]);    
                this.consume(TokenTypes.AmpersandAmpersandDingoToken);
                this.Exprcomp(aux3/*o*/);
                this.F(aux3/*o*/);
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }

    private Funcall(id/*o*/){
        //stack.push("Funcall");
        //console.log(stack);
        let aux = id;
        let aux2 = id + 1
        entries.push({
            "id": aux2,
            "parentId": aux,
            "state": "Funcall"
            });
        switch(this.currentToken.type){
            case TokenTypes.IdentifierDingo:
                //stack.push(TokenTypes.IdentifierDingo);
                let aux3 = aux2;
                let aux4 = aux2 + 1;

                entries.push({
                    "id": aux4,
                    "parentId": aux3,
                    "state": TokenTypes[TokenTypes.IdentifierDingo]
                    });
                    this.tokens[ind]["Fun"] = 0;
                    ind++; 
                this.tokens[ind ]["Scope"] = scopeCount;
                console.log(this.tokens[ind]);    
                this.consume(TokenTypes.IdentifierDingo);
                //stack.push(TokenTypes.OpenParenDingoToken);
                entries.push({
                    "id": aux4 + 1,
                    "parentId": aux3,
                    "state": TokenTypes[TokenTypes.OpenParenDingoToken]
                    });
                    this.tokens[ind]["Fun"] = 0;
                    ind++; 
                this.tokens[ind ]["Scope"] = scopeCount;
                console.log(this.tokens[ind]);
                this.consume(TokenTypes.OpenParenDingoToken);
                this.Exprlist(aux3/*o*/);
                //stack.push(TokenTypes.CloseParenDingoToken);
                entries.push({
                    "id": aux4 + 2,
                    "parentId": aux3,
                    "state": TokenTypes[TokenTypes.CloseParenDingoToken]
                    });
                    this.tokens[ind]["Fun"] = 0;
                    ind++; 
                this.tokens[ind ]["Scope"] = scopeCount;
                console.log(this.tokens[ind]);    
                this.consume(TokenTypes.CloseParenDingoToken);
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }

    private Fundef(id/*o*/){
        //stack.push("Fundef");
        //console.log(stack);
        
        let aux = id;
        let aux2 = id + 1

        entries.push({
            "id": aux2,
            "parentId": aux,
            "state": "Fundef"
            });

        switch(this.currentToken.type){
            case TokenTypes.IdentifierDingo:
    //stack.push(TokenTypes.IdentifierDingo);

                let aux3 = aux2;
                let aux4 = aux2 + 1;

                entries.push({
                    "id": aux4,
                    "parentId": aux3,
                    "state": TokenTypes[TokenTypes.IdentifierDingo]
                    });
                    this.tokens[ind]["Fun"] = 1;
                    ind++; 
                this.tokens[ind ]["Scope"] = scopeCount;
                
                console.log(this.tokens[ind ]);    
                this.consume(TokenTypes.IdentifierDingo);
    //stack.push(TokenTypes.OpenParenDingoToken);
    
                entries.push({
                    "id": aux4 + 1,
                    "parentId": aux3,
                    "state": TokenTypes[TokenTypes.OpenParenDingoToken]
                    });    
                    this.tokens[ind]["Fun"] = 0;
                    ind++;    
                    
                this.tokens[ind]["Scope"] = scopeCount;
                console.log(this.tokens[ind]);
                console.log(ind);    
                this.consume(TokenTypes.OpenParenDingoToken);
        

                this.Paramlist(aux3/*o*/);
    //stack.push(TokenTypes.CloseParenDingoToken);

                entries.push({
                    "id": aux4 + 2,
                    "parentId": aux3,
                    "state": TokenTypes[TokenTypes.CloseParenDingoToken]
                    });   
                    this.tokens[ind]["Fun"] = 0;
                    ind++; 
                this.tokens[ind ]["Scope"] = scopeCount;
                console.log(this.tokens[ind ]);
                console.log(ind);
                this.consume(TokenTypes.CloseParenDingoToken);
    //stack.push(TokenTypes.OpenBraceDingoToken);

                entries.push({
                    "id": aux4 + 3,
                    "parentId": aux3,
                    "state": TokenTypes[TokenTypes.OpenBraceDingoToken]
                    });       
                    this.tokens[ind]["Fun"] = 0;
                    ind++; 
                    scopeCount++;
                this.tokens[ind]["Scope"] = scopeCount;
                console.log(this.tokens[ind]);    
                this.consume(TokenTypes.OpenBraceDingoToken);
                this.Vardeflist(aux3/*o*/);
                this.Stmtlist(aux3/*o*/);
    //stack.push(TokenTypes.CloseParenDingoToken);
                
                entries.push({
                    "id": aux4 + 4,
                    "parentId": aux3,
                    "state": TokenTypes[TokenTypes.CloseBraceDingoToken]
                    });    
                    this.tokens[ind]["Fun"] = 0;
                    ind++; 
                this.tokens[ind ]["Scope"] = scopeCount;
                console.log(this.tokens[ind ]);    
                this.consume(TokenTypes.CloseBraceDingoToken);
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }

    private G(id/*o*/){
        //stack.push("G");
        //console.log(stack);
        let aux = id;
        let aux2 = id + 1
        entries.push({
            "id": aux2,
            "parentId": aux,
            "state": "G"
            });
        switch(this.currentToken.type){
            case TokenTypes.SemicolonDingoToken:
            case TokenTypes.AmpersandAmpersandDingoToken:
            case TokenTypes.CommaDingoToken:
            case TokenTypes.BarBarDingoToken:
            case TokenTypes.CloseBracketDingoToken:
            case TokenTypes.CloseParenDingoToken:
                return;
            case TokenTypes.ExclamationEqualsDingoToken:
                this.Opcomp(aux2/*o*/);
                this.Exprrel(aux2/*o*/);
                this.G(aux2/*o*/);
                break;
            case TokenTypes.EqualsEqualsDingoToken:
                this.Opcomp(aux2/*o*/);
                this.Exprrel(aux2/*o*/);
                this.G(aux2/*o*/);
                break;    
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }

    private H(id/*o*/){
        //stack.push("H");
        //console.log(stack);
        let aux = id;
        let aux2 = id + 1
        entries.push({
            "id": aux2,
            "parentId": aux,
            "state": "H"
            });
        switch(this.currentToken.type){
            case TokenTypes.SemicolonDingoToken:
            case TokenTypes.AmpersandAmpersandDingoToken:
            case TokenTypes.CommaDingoToken:
            case TokenTypes.ExclamationEqualsDingoToken:
            case TokenTypes.EqualsEqualsDingoToken:
            case TokenTypes.BarBarDingoToken:
            case TokenTypes.CloseBracketDingoToken:
            case TokenTypes.CloseParenDingoToken:
                return;
            case TokenTypes.GreaterThanDingoToken:
                this.Oprel(aux2/*o*/);
                this.Expradd(aux2/*o*/);
                this.H(aux2/*o*/);
                break;
            case TokenTypes.GreaterThanEqualsDingoToken:
                this.Oprel(aux2/*o*/);
                this.Expradd(aux2/*o*/);
                this.H(aux2/*o*/);
                break;
            case TokenTypes.LessThanDingoToken:
                this.Oprel(aux2/*o*/);
                this.Expradd(aux2/*o*/);
                this.H(aux2/*o*/);
                break;  
            case TokenTypes.LessThanEqualsDingoToken:
                this.Oprel(aux2/*o*/);
                this.Expradd(aux2/*o*/);
                this.H(aux2/*o*/);
                break;

            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }

    private I(id/*o*/){
        //stack.push("I");
        //console.log(stack);
        let aux = id;
        let aux2 = id + 1
        entries.push({
            "id": aux2,
            "parentId": aux,
            "state": "I"
            });

        switch(this.currentToken.type){
            case TokenTypes.SemicolonDingoToken:
            case TokenTypes.AmpersandAmpersandDingoToken:
            case TokenTypes.CommaDingoToken:
            case TokenTypes.ExclamationEqualsDingoToken:
            case TokenTypes.EqualsEqualsDingoToken:
            case TokenTypes.GreaterThanDingoToken:
            case TokenTypes.GreaterThanEqualsDingoToken:
            case TokenTypes.LessThanDingoToken:
            case TokenTypes.LessThanEqualsDingoToken:
            case TokenTypes.BarBarDingoToken:
            case TokenTypes.CloseBracketDingoToken:
            case TokenTypes.CloseParenDingoToken:
                return;

            case TokenTypes.PlusDingoToken:
                this.Opadd(aux2/*o*/);
                this.Exprmul(aux2/*o*/);
                this.I(aux2/*o*/);
                break;
            case TokenTypes.MinusDingoToken:
                this.Opadd(aux2/*o*/);
                this.Exprmul(aux2/*o*/);
                this.I(aux2/*o*/);
                break;

            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }


    private Id(id/*o*/){
        //stack.push("Id");
        //console.log(stack);
        let aux = id;
        let aux2 = id + 1
        entries.push({
            "id": aux2,
            "parentId": aux,
            "state": "Id"
            });

        switch(this.currentToken.type){
            case TokenTypes.IdentifierDingo:
                //stack.push(TokenTypes.IdentifierDingo);
                let aux3 = aux2;
                let aux4 = aux2 + 1;

                entries.push({
                    "id": aux4,
                    "parentId": aux3,
                    "state": TokenTypes[TokenTypes.IdentifierDingo]
                    });
                    this.tokens[ind]["Fun"] = 0;
                    ind++; 
                this.tokens[ind ]["Scope"] = scopeCount;
                console.log(this.tokens[ind ]);    
                this.consume(TokenTypes.IdentifierDingo);
                break;

            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }

    private Idlist(id/*o*/){
        //stack.push("Idlist");
        //console.log(stack);
        let aux = id;
        let aux2 = id + 1
        entries.push({
            "id": aux2,
            "parentId": aux,
            "state": "Idlist"
            });
        switch(this.currentToken.type){
            case TokenTypes.IdentifierDingo:
                this.Id(aux2/*o*/);
                this.Idlistcont(aux2/*o*/);
                break;
                
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }

    private Idlistcont(id/*o*/){
        //stack.push("Idlistcont");
        //console.log(stack);
        let aux = id;
        let aux2 = id + 1
        entries.push({
            "id": aux2,
            "parentId": aux,
            "state": "Idlistcont"
            });
        switch(this.currentToken.type){
            case TokenTypes.CloseParenDingoToken:
            case TokenTypes.SemicolonDingoToken:
                return;
            case TokenTypes.CommaDingoToken:    
                //stack.push(TokenTypes.CommaDingoToken);
                let aux3 = aux2;
                let aux4 = aux2 + 1;

                entries.push({
                    "id": aux4,
                    "parentId": aux3,
                    "state": TokenTypes[TokenTypes.CommaDingoToken]
                    });
                    this.tokens[ind]["Fun"] = 0;
                    ind++; 
                this.tokens[ind ]["Scope"] = scopeCount;
                console.log(this.tokens[ind ]);    
                this.consume(TokenTypes.CommaDingoToken);
                //stack.push(TokenTypes.IdentifierDingo);
                entries.push({
                    "id": aux4 + 1,
                    "parentId": aux3,
                    "state": TokenTypes[TokenTypes.IdentifierDingo]
                    });
                    this.tokens[ind]["Fun"] = 0;
                    ind++; 
                this.tokens[ind ]["Scope"] = scopeCount;
                console.log(this.tokens[ind]);    
                this.consume(TokenTypes.IdentifierDingo);
                this.Idlistcont(aux3/*o*/);
                break;
                
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }


    private J(id/*o*/){
        //stack.push("J");
        //console.log(stack);
        let aux = id;
        let aux2 = id + 1
        entries.push({
            "id": aux2,
            "parentId": aux,
            "state": "J"
            });

        switch(this.currentToken.type){
            case TokenTypes.SemicolonDingoToken:
            case TokenTypes.AmpersandAmpersandDingoToken:            
            case TokenTypes.CommaDingoToken: 
            case TokenTypes.ExclamationEqualsDingoToken:
            case TokenTypes.EqualsEqualsDingoToken:
            case TokenTypes.GreaterThanDingoToken:
            case TokenTypes.GreaterThanEqualsDingoToken:
            case TokenTypes.LessThanDingoToken:
            case TokenTypes.LessThanEqualsDingoToken:  
            case TokenTypes.MinusDingoToken:
            case TokenTypes.PlusDingoToken:
            case TokenTypes.BarBarDingoToken:
            case TokenTypes.CloseBracketDingoToken:
            case TokenTypes.CloseParenDingoToken:
                return;

            case TokenTypes.AsteriskDingoToken:
                this.Opmul(aux2/*o*/);
                this.Exprunary(aux2/*o*/);
                this.J(aux2/*o*/);
                break;

            case TokenTypes.PercentDingoToken:    
                this.Opmul(aux2/*o*/);
                this.Exprunary(aux2/*o*/);
                this.J(aux2/*o*/);
                break;
            case TokenTypes.SlashDingoToken:    
                this.Opmul(aux2/*o*/);
                this.Exprunary(aux2/*o*/);
                this.J(aux2/*o*/);
                break;

                
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }

    private Lit(id/*o*/){
        //stack.push("Lit");
        //console.log(stack);
        let aux = id;
        let aux2 = id + 1
        entries.push({
            "id": aux2,
            "parentId": aux,
            "state": "Lit"
            });
        switch(this.currentToken.type){
            case TokenTypes.IntegerLiteralDingo:
            let aux3 = aux2;
            let aux4 = aux2 + 1;

                entries.push({
                    "id": aux4,
                    "parentId": aux3,
                    "state": TokenTypes[TokenTypes.IntegerLiteralDingo]
                    });
                //stack.push(TokenTypes.IntegerLiteralDingo);
                this.tokens[ind]["Fun"] = 0;
                ind++; 
                this.tokens[ind ]["Scope"] = scopeCount;
                console.log(this.tokens[ind]);
                this.consume(TokenTypes.IntegerLiteralDingo);
                break;
            case TokenTypes.CharacterLiteralDingo:
                //stack.push(TokenTypes.CharacterLiteralDingo);
                entries.push({
                    "id": aux4 + 1,
                    "parentId": aux3,
                    "state": TokenTypes[TokenTypes.IntegerLiteralDingo]
                    });
                    this.tokens[ind]["Fun"] = 0;
                    ind++; 
                this.tokens[ind ]["Scope"] = scopeCount;
                console.log(this.tokens[ind]);    
                this.consume(TokenTypes.CharacterLiteralDingo);
                break;
            case TokenTypes.StringLiteralDingo: 
                //stack.push(TokenTypes.StringLiteralDingo);
                entries.push({
                    "id": aux4 + 2,
                    "parentId": aux3,
                    "state": TokenTypes[TokenTypes.IntegerLiteralDingo]
                    });
                    this.tokens[ind]["Fun"] = 0;
                    ind++; 
                this.tokens[ind]["Scope"] = scopeCount;
                console.log(this.tokens[ind]);    
                this.consume(TokenTypes.StringLiteralDingo);
                break;
                
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }

    private Opadd(id/*o*/){
        //stack.push("Opadd");
        //console.log(stack);
        let aux = id;
        let aux2 = id + 1
        entries.push({
            "id": aux2,
            "parentId": aux,
            "state": "Opadd"
            });
        switch(this.currentToken.type){
            case TokenTypes.MinusDingoToken:
            let aux3 = aux2;
            let aux4 = aux2 + 1;

                entries.push({
                    "id": aux4,
                    "parentId": aux3,
                    "state": TokenTypes[TokenTypes.MinusDingoToken]
                    });
            //stack.push(TokenTypes.MinusDingoToken);
            this.tokens[ind]["Fun"] = 0;
            ind++; 
                this.tokens[ind ]["Scope"] = scopeCount;
                console.log(this.tokens[ind ]);
                this.consume(TokenTypes.MinusDingoToken);
                break;
            case TokenTypes.PlusDingoToken:
           // stack.push(TokenTypes.PlusDingoToken);
            entries.push({
                "id": aux4 + 1,
                "parentId": aux3,
                "state": TokenTypes[TokenTypes.PlusDingoToken]
                });
                this.tokens[ind]["Fun"] = 0;
                ind++; 
                this.tokens[ind]["Scope"] = scopeCount;
                    console.log(this.tokens[ind ]);
                this.consume(TokenTypes.PlusDingoToken);
                break;

            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }

    private Opcomp(id/*o*/){
        //stack.push("Opcomp");
        //console.log(stack);
        let aux = id;
        let aux2 = id + 1
        entries.push({
            "id": aux2,
            "parentId": aux,
            "state": "Opcomp"
            });

        switch(this.currentToken.type){
            case TokenTypes.ExclamationEqualsDingoToken:
                //stack.push(TokenTypes.ExclamationEqualsDingoToken);
                let aux3 = aux2;
                let aux4 = aux2 + 1;

                entries.push({
                    "id": aux4,
                    "parentId": aux3,
                    "state": TokenTypes[TokenTypes.ExclamationEqualsDingoToken]
                    });
                    this.tokens[ind]["Fun"] = 0;
                    ind++; 
                this.tokens[ind ]["Scope"] = scopeCount;
                console.log(this.tokens[ind ]);    
                this.consume(TokenTypes.ExclamationEqualsDingoToken);
                break;
            case TokenTypes.EqualsEqualsDingoToken:
                //stack.push(TokenTypes.EqualsEqualsDingoToken);
                entries.push({
                    "id": aux4 + 1,
                    "parentId": aux3,
                    "state": TokenTypes[TokenTypes.EqualsEqualsDingoToken]
                    });
                    this.tokens[ind]["Fun"] = 0;
                    ind++; 
                this.tokens[ind ]["Scope"] = scopeCount;
                console.log(this.tokens[ind ]);    
                this.consume(TokenTypes.EqualsEqualsDingoToken);
                break;

            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }

    private Opmul(id/*o*/){
        //stack.push("Opmul");
        //console.log(stack);
        let aux = id;
        let aux2 = id + 1
        entries.push({
            "id": aux2,
            "parentId": aux,
            "state": "Opmul"
            });
        switch(this.currentToken.type){
            case TokenTypes.AsteriskDingoToken:
                //stack.push(TokenTypes.AsteriskDingoToken);
                let aux3 = aux2;
                let aux4 = aux2 + 1;

                entries.push({
                    "id": aux4,
                    "parentId": aux3,
                    "state": TokenTypes[TokenTypes.AsteriskDingoToken]
                    });
                    this.tokens[ind]["Fun"] = 0;
                    ind++; 
                this.tokens[ind ]["Scope"] = scopeCount;
                console.log(this.tokens[ind]);    
                this.consume(TokenTypes.AsteriskDingoToken);
                break;
            case TokenTypes.PercentDingoToken:
            //stack.push(TokenTypes.PercentDingoToken);
            entries.push({
                "id": aux4 + 1,
                "parentId": aux3,
                "state": TokenTypes[TokenTypes.PercentDingoToken]
                });
                this.tokens[ind]["Fun"] = 0;
                ind++; 
                this.tokens[ind ]["Scope"] = scopeCount;
                console.log(this.tokens[ind ]);
                this.consume(TokenTypes.PercentDingoToken);
                break;
            case TokenTypes.SlashDingoToken:
            //stack.push(TokenTypes.SlashDingoToken);
            entries.push({
                "id": aux4 + 2,
                "parentId": aux3,
                "state": TokenTypes[TokenTypes.SlashDingoToken]
                });
                this.tokens[ind]["Fun"] = 0;
                ind++; 
                this.tokens[ind ]["Scope"] = scopeCount;
                console.log(this.tokens[ind ]);
                this.consume(TokenTypes.SlashDingoToken);
                break;

            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }

    private Oprel(id/*o*/){
        //stack.push("Oprel");
        //console.log(stack);
        let aux = id;
        let aux2 = id + 1
        entries.push({
            "id": aux2,
            "parentId": aux,
            "state": "Oprel"
            });

        switch(this.currentToken.type){
            case TokenTypes.GreaterThanDingoToken:
                //stack.push(TokenTypes.GreaterThanDingoToken);
                let aux3 = aux2;
                let aux4 = aux2 + 1;

                entries.push({
                    "id": aux4,
                    "parentId": aux3,
                    "state": TokenTypes[TokenTypes.GreaterThanDingoToken]
                    });
                    this.tokens[ind]["Fun"] = 0;
                    ind++; 
                this.tokens[ind ]["Scope"] = scopeCount;
                console.log(this.tokens[ind]);    
                this.consume(TokenTypes.GreaterThanDingoToken);
                break;
            case TokenTypes.GreaterThanEqualsDingoToken:
            //stack.push(TokenTypes.GreaterThanEqualsDingoToken);
            entries.push({
                "id": aux4 + 1,
                "parentId": aux3,
                "state": TokenTypes[TokenTypes.GreaterThanEqualsDingoToken]
                });
                this.tokens[ind]["Fun"] = 0;
                ind++; 
                this.tokens[ind ]["Scope"] = scopeCount;
                console.log(this.tokens[ind ]);
                this.consume(TokenTypes.GreaterThanEqualsDingoToken);
                break;
            case TokenTypes.LessThanDingoToken:
            //stack.push(TokenTypes.LessThanDingoToken);
            entries.push({
                "id": aux4 + 2,
                "parentId": aux3,
                "state": TokenTypes[TokenTypes.LessThanDingoToken]
                });
                this.tokens[ind]["Fun"] = 0;
                ind++; 
                this.tokens[ind ]["Scope"] = scopeCount;
                console.log(this.tokens[ind]);
                this.consume(TokenTypes.LessThanDingoToken);
                break;
            case TokenTypes.LessThanEqualsDingoToken:
            //stack.push(TokenTypes.LessThanEqualsDingoToken);
            entries.push({
                "id": aux4 + 3,
                "parentId": aux3,
                "state": TokenTypes[TokenTypes.LessThanEqualsDingoToken]
                });
                this.tokens[ind]["Fun"] = 0;
                ind++; 
                this.tokens[ind ]["Scope"] = scopeCount;
                console.log(this.tokens[ind ]);
                this.consume(TokenTypes.LessThanEqualsDingoToken);
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }

    private Opunary(id/*o*/){
        //stack.push("Opunary");
        //console.log(stack);
        let aux = id;
        let aux2 = id + 1
        entries.push({
            "id": aux2,
            "parentId": aux,
            "state": "Opunary"
            });

        switch(this.currentToken.type){
            case TokenTypes.ExclamationDingoToken:
                //stack.push(TokenTypes.ExclamationDingoToken);
                let aux3 = aux2;
                let aux4 = aux2 + 1;

                entries.push({
                    "id": aux4,
                    "parentId": aux3,
                    "state": TokenTypes[TokenTypes.ExclamationDingoToken]
                    });
                    this.tokens[ind]["Fun"] = 0;
                    ind++; 
                this.tokens[ind ]["Scope"] = scopeCount;
                console.log(this.tokens[ind ]);    
                this.consume(TokenTypes.ExclamationDingoToken);
                break;
            case TokenTypes.MinusDingoToken:
                //stack.push(TokenTypes.MinusDingoToken);
                entries.push({
                    "id": aux4 + 1,
                    "parentId": aux3,
                    "state": TokenTypes[TokenTypes.MinusDingoToken]
                    });
                    this.tokens[ind]["Fun"] = 0;
                    ind++; 
                this.tokens[ind ]["Scope"] = scopeCount;
                console.log(this.tokens[ind ]);    
                this.consume(TokenTypes.MinusDingoToken);
                break;
            case TokenTypes.PlusDingoToken:
                //stack.push(TokenTypes.PlusDingoToken);
                entries.push({
                    "id": aux4 + 2,
                    "parentId": aux3,
                    "state": TokenTypes[TokenTypes.PlusDingoToken]
                    });
                    this.tokens[ind]["Fun"] = 0;
                    ind++; 
                this.tokens[ind ]["Scope"] = scopeCount;
                console.log(this.tokens[ind]);    
                this.consume(TokenTypes.PlusDingoToken);
                break;
        
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }

    private Paramlist(id/*o*/){
        //stack.push("Paramlist");
        //console.log(stack);

        let aux = id;
        let aux2 = id + 1
        entries.push({
            "id": aux2,
            "parentId": aux,
            "state": "Paramlist"
            });

        switch(this.currentToken.type){
            case TokenTypes.IdentifierDingo:
            let aux3 = aux2;
            let aux4 = aux2 + 1;

                entries.push({
                    "id": aux4,
                    "parentId": aux3,
                    "state": TokenTypes[TokenTypes.IdentifierDingo]
                    });
                //stack.push(TokenTypes.IdentifierDingo);
                this.tokens[ind]["Fun"] = 0;
                ind++; 
                this.tokens[ind]["Scope"] = scopeCount;
                console.log(this.tokens[ind]);
                this.consume(TokenTypes.IdentifierDingo);
                this.Idlistcont(aux3/*o*/);
                break;
            case TokenTypes.CloseParenDingoToken:
                return;
        
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }

    private Program(){
         //stack.push("Program");
         //console.log(stack);

        let id = 1;
        this.tokens[ind]["Scope"] = scopeCount;
        console.log(this.tokens[ind]);
         entries.push({
            "id": id,
            "parentId": 0,
            "state": "Program",
            }); 
        switch(this.currentToken.type){
            case TokenTypes.IdentifierDingo:
                this.Deflist(id/*o*/);
                break;
            case TokenTypes.VarDingoKeyword:
                this.Deflist(id/*o*/);
                break;
            case TokenTypes.PesoToken:
                this.Deflist(id/*o*/);
                break;

            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }

    private Stmt(id/*o*/){
        //stack.push("Stmt");
        //console.log(stack);
        let aux = id;
        let aux2 = id + 1
        entries.push({
            "id": aux2,
            "parentId": aux,
            "state": "Stmt"
            });
        switch(this.currentToken.type){
            case TokenTypes.SemicolonDingoToken:
                this.Stmtempt(aux2/*o*/);
                break;
            case TokenTypes.BreakDingoKeyword:
                this.Stmtbreak(aux2/*o*/);
                break;
            case TokenTypes.IdentifierDingo:
            let aux3 = aux2;
            let aux4 = aux2 + 1;

                entries.push({
                    "id": aux4,
                    "parentId": aux3,
                    "state": TokenTypes[TokenTypes.IdentifierDingo]
                    });
                    this.tokens[ind]["Fun"] = 0;
                    ind++; 
                this.tokens[ind]["Scope"] = scopeCount;
                console.log(this.tokens[ind]);    
                this.consume(TokenTypes.IdentifierDingo);
                this.Stmtp(aux2/*o*/);
                break;
            case TokenTypes.IfDingoKeyword:
                this.Stmtif(aux2/*o*/);
                break;
            case TokenTypes.LoopDingoKeyword:
                this.Stmtloop(aux2/*o*/);
                break; 
            case TokenTypes.ReturnDingoKeyword:
                this.Stmtreturn(aux2/*o*/);
                break;             
                    
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }

    private Stmtp(id/*o*/){
        //stack.push("Stmtp");
        //console.log(stack);
        let aux = id;
        let aux2 = id + 1
        entries.push({
            "id": aux2,
            "parentId": aux,
            "state": "Stmtp"
            });
        switch(this.currentToken.type){
            case TokenTypes.EqualsDingoToken:
            //stack.push(TokenTypes.EqualsDingoToken);
            let aux3 = aux2;
            let aux4 = aux2 + 1;

                entries.push({
                    "id": aux4,
                    "parentId": aux3,
                    "state": TokenTypes[TokenTypes.EqualsDingoToken]
                    });
                    this.tokens[ind]["Fun"] = 0;
                    ind++; 
                this.tokens[ind ]["Scope"] = scopeCount;
                console.log(this.tokens[ind ]);    
                this.consume(TokenTypes.EqualsDingoToken);
                this.Expr(aux3/*o*/);
                break;
            case TokenTypes.OpenParenDingoToken:
            //stack.push(TokenTypes.OpenParenDingoToken);
            entries.push({
                "id": aux4,
                "parentId": aux3,
                "state": TokenTypes[TokenTypes.OpenParenDingoToken]
                });
                this.tokens[ind]["Fun"] = 0;
                ind++; 
                this.tokens[ind]["Scope"] = scopeCount;
                console.log(this.tokens[ind]);
                this.consume(TokenTypes.OpenParenDingoToken);
                this.Exprlist(aux3/*o*/);
                //stack.push(TokenTypes.CloseParenDingoToken);
                entries.push({
                    "id": aux4 + 1,
                    "parentId": aux3,
                    "state": TokenTypes[TokenTypes.CloseParenDingoToken]
                    });
                    this.tokens[ind]["Fun"] = 0;
                    ind++; 
                this.tokens[ind ]["Scope"] = scopeCount;
                console.log(this.tokens[ind]);    
                this.consume(TokenTypes.CloseParenDingoToken);
                break;
            case TokenTypes.PlusPlusDingoToken:
                //stack.push(TokenTypes.PlusPlusDingoToken);
                entries.push({
                    "id": aux4 + 2,
                    "parentId": aux3,
                    "state": TokenTypes[TokenTypes.PlusPlusDingoToken]
                    });
                    this.tokens[ind]["Fun"] = 0;
                    ind++; 
                this.tokens[ind ]["Scope"] = scopeCount;
                console.log(this.tokens[ind ]);    
                this.consume(TokenTypes.PlusPlusDingoToken);
                //stack.push(TokenTypes.SemicolonDingoToken);
                entries.push({
                    "id": aux4 + 3,
                    "parentId": aux3,
                    "state": TokenTypes[TokenTypes.SemicolonDingoToken]
                    });
                    this.tokens[ind]["Fun"] = 0;
                    ind++; 
                this.tokens[ind ]["Scope"] = scopeCount;
                console.log(this.tokens[ind ]);    
                this.consume(TokenTypes.SemicolonDingoToken);
                break;
            case TokenTypes.MinusMinusDingoToken:
            //stack.push(TokenTypes.MinusMinusDingoToken);
            entries.push({
                "id": aux4 + 4,
                "parentId": aux3,
                "state": TokenTypes[TokenTypes.MinusMinusDingoToken]
                });
                this.tokens[ind]["Fun"] = 0;
                ind++; 
                this.tokens[ind ]["Scope"] = scopeCount;
                console.log(this.tokens[ind ]);
                this.consume(TokenTypes.MinusMinusDingoToken);
                //stack.push(TokenTypes.SemicolonDingoToken);
                entries.push({
                    "id": aux4 + 5,
                    "parentId": aux3,
                    "state": TokenTypes[TokenTypes.SemicolonDingoToken]
                    });
                    this.tokens[ind]["Fun"] = 0;
                    ind++; 
                this.tokens[ind ]["Scope"] = scopeCount;
                console.log(this.tokens[ind ]);    
                this.consume(TokenTypes.SemicolonDingoToken);
                break;    
                    
                    
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }

    private Stmtassign(id/*o*/){
        //stack.push("Stmtassign");
        //console.log(stack);
        let aux = id;
        let aux2 = id + 1
        entries.push({
            "id": aux2,
            "parentId": aux,
            "state": "Stmtassign"
            });
        switch(this.currentToken.type){
            case TokenTypes.IdentifierDingo:
            //stack.push(TokenTypes.IdentifierDingo);
            let aux3 = aux2;
            let aux4 = aux2 + 1;

                entries.push({
                    "id": aux4 + 1,
                    "parentId": aux3,
                    "state": TokenTypes[TokenTypes.IdentifierDingo]
                    });
                    this.tokens[ind]["Fun"] = 0;
                    ind++; 
                this.tokens[ind ]["Scope"] = scopeCount;
                console.log(this.tokens[ind ]);    
                this.consume(TokenTypes.IdentifierDingo);
                //stack.push(TokenTypes.EqualsDingoToken);
                entries.push({
                    "id": aux4 + 2,
                    "parentId": aux3,
                    "state": TokenTypes[TokenTypes.EqualsDingoToken]
                    });
                    this.tokens[ind]["Fun"] = 0;
                    ind++; 
                this.tokens[ind ]["Scope"] = scopeCount;
                console.log(this.tokens[ind ]);    
                this.consume(TokenTypes.EqualsDingoToken);
                this.Expr(aux3/*o*/);
                //stack.push(TokenTypes.SemicolonDingoToken);
                entries.push({
                    "id": aux4 + 3,
                    "parentId": aux3,
                    "state": TokenTypes[TokenTypes.SemicolonDingoToken]
                    });

                    this.tokens[ind]["Fun"] = 0;
                    ind++; 
                this.tokens[ind ]["Scope"] = scopeCount;
                console.log(this.tokens[ind ]);    
                this.consume(TokenTypes.SemicolonDingoToken);
                break;
                                
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }

    private Stmtbreak(id/*o*/){
        //stack.push("Stmtbreak");
        //console.log(stack);
        let aux = id;
        let aux2 = id + 1
        entries.push({
            "id": aux2,
            "parentId": aux,
            "state": "Stmtbreak"
            });
        switch(this.currentToken.type){
            case TokenTypes.BreakDingoKeyword:
            let aux3 = aux2;
            let aux4 = aux2 + 1;

                entries.push({
                    "id": aux4,
                    "parentId": aux3,
                    "state": TokenTypes[TokenTypes.BreakDingoKeyword]
                    });
            //stack.push(TokenTypes.BreakDingoKeyword);
            this.tokens[ind]["Fun"] = 0;
            ind++; 
                this.tokens[ind ]["Scope"] = scopeCount;
                console.log(this.tokens[ind ]);
                this.consume(TokenTypes.BreakDingoKeyword);
                //stack.push(TokenTypes.SemicolonDingoToken);
                entries.push({
                    "id": aux4 + 1,
                    "parentId": aux3,
                    "state": TokenTypes[TokenTypes.SemicolonDingoToken]
                    });
                    this.tokens[ind]["Fun"] = 0;
                    ind++; 
                this.tokens[ind ]["Scope"] = scopeCount;
                console.log(this.tokens[ind ]);    
                this.consume(TokenTypes.SemicolonDingoToken);
                break;                              
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }

    private Stmtdecr(id/*o*/){
        //stack.push("Stmtdecr");
        //console.log(stack);
        let aux = id;
        let aux2 = id + 1
        entries.push({
            "id": aux2,
            "parentId": aux,
            "state": "Stmtdecr"
            });

        switch(this.currentToken.type){
            case TokenTypes.IdentifierDingo:
            //stack.push(TokenTypes.IdentifierDingo);
            
            let aux3 = aux2;
            let aux4 = aux2 + 1;

                entries.push({
                    "id": aux4,
                    "parentId": aux3,
                    "state": TokenTypes[TokenTypes.IdentifierDingo]
                    });
                    this.tokens[ind]["Fun"] = 0;
                    ind++; 
                this.tokens[ind ]["Scope"] = scopeCount;
                console.log(this.tokens[ind ]);    
                this.consume(TokenTypes.IdentifierDingo);
                //stack.push(TokenTypes.MinusMinusDingoToken);
                entries.push({
                    "id": aux4 + 1,
                    "parentId": aux3,
                    "state": TokenTypes[TokenTypes.MinusMinusDingoToken]
                    });
                    this.tokens[ind]["Fun"] = 0;
                    ind++; 
                this.tokens[ind ]["Scope"] = scopeCount;
                console.log(this.tokens[ind ]);    
                this.consume(TokenTypes.MinusMinusDingoToken);
                //stack.push(TokenTypes.SemicolonDingoToken);
                entries.push({
                    "id": aux4 + 2,
                    "parentId": aux3,
                    "state": TokenTypes[TokenTypes.SemicolonDingoToken]
                    });
                    this.tokens[ind]["Fun"] = 0;
                    ind++; 
                this.tokens[ind ]["Scope"] = scopeCount;
                console.log(this.tokens[ind ]);    
                this.consume(TokenTypes.SemicolonDingoToken);
                break;

            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }

    private Stmtempt(id/*o*/){
        //stack.push("Stmtempt");
        //console.log(stack);
        let aux = id;
        let aux2 = id + 1
        entries.push({
            "id": aux2,
            "parentId": aux,
            "state": "Stmtempt"
            });

        switch(this.currentToken.type){
            case TokenTypes.SemicolonDingoToken:
                //stack.push(TokenTypes.SemicolonDingoToken);
                let aux3 = aux2;
                let aux4 = aux2 + 1;

                entries.push({
                    "id": aux4,
                    "parentId": aux3,
                    "state": TokenTypes[TokenTypes.SemicolonDingoToken]
                    });
                    this.tokens[ind]["Fun"] = 0;
                    ind++; 
                this.tokens[ind ]["Scope"] = scopeCount;
                console.log(this.tokens[ind ]);    
                this.consume(TokenTypes.SemicolonDingoToken);
                break;
                                            
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }

    private Stmtfuncall(id/*o*/){
        //stack.push("Stmtfuncall");
        //console.log(stack);
        let aux = id;
        let aux2 = id + 1
        entries.push({
            "id": aux2,
            "parentId": aux,
            "state": "Stmtfuncall"
            });
        switch(this.currentToken.type){
            case TokenTypes.IdentifierDingo:
                this.Funcall(aux2/*o*/);
                //stack.push(TokenTypes.SemicolonDingoToken);
                let aux3 = aux2;
                let aux4 = aux2 + 1;

                entries.push({
                    "id": aux4,
                    "parentId": aux3,
                    "state": TokenTypes[TokenTypes.SemicolonDingoToken]
                    });
                    this.tokens[ind]["Fun"] = 0;
                    ind++; 
                this.tokens[ind ]["Scope"] = scopeCount;
                console.log(this.tokens[ind ]);     
                this.consume(TokenTypes.SemicolonDingoToken);
                break;

            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }

    private Stmtif(id/*o*/){
        //stack.push("Stmtif");
        //console.log(stack);
        let aux = id;
        let aux2 = id + 1
        entries.push({
            "id": aux2,
            "parentId": aux,
            "state": "Stmtif"
            });
        switch(this.currentToken.type){
            case TokenTypes.IfDingoKeyword:
            //stack.push(TokenTypes.IfDingoKeyword);
            let aux3 = aux2;
            let aux4 = aux2 + 1;

                entries.push({
                    "id": aux4,
                    "parentId": aux3,
                    "state": TokenTypes[TokenTypes.IfDingoKeyword]
                    });
                    this.tokens[ind]["Fun"] = 0;
                    ind++; 
                this.tokens[ind ]["Scope"] = scopeCount;
                console.log(this.tokens[ind ]);    
                this.consume(TokenTypes.IfDingoKeyword);
                //stack.push(TokenTypes.OpenParenDingoToken);
                entries.push({
                    "id": aux4 + 1,
                    "parentId": aux3,
                    "state": TokenTypes[TokenTypes.OpenParenDingoToken]
                    });
                    this.tokens[ind]["Fun"] = 0;
                    ind++; 
                this.tokens[ind ]["Scope"] = scopeCount;
                console.log(this.tokens[ind ]);    
                this.consume(TokenTypes.OpenParenDingoToken);
                this.Expr(aux3/*o*/);
                //stack.push(TokenTypes.CloseParenDingoToken);
                entries.push({
                    "id": aux4 + 2,
                    "parentId": aux3,
                    "state": TokenTypes[TokenTypes.CloseParenDingoToken]
                    });
                    this.tokens[ind]["Fun"] = 0;
                    ind++; 
                this.tokens[ind ]["Scope"] = scopeCount;
                console.log(this.tokens[ind ]);    
                this.consume(TokenTypes.CloseParenDingoToken);
                //stack.push(TokenTypes.OpenBraceDingoToken);
                entries.push({
                    "id": aux4 + 3,
                    "parentId": aux3,
                    "state": TokenTypes[TokenTypes.OpenBraceDingoToken]
                    });
                    this.tokens[ind]["Fun"] = 0;
                    ind++; 
                    scopeCount++;
                this.tokens[ind ]["Scope"] = scopeCount;
                console.log(this.tokens[ind ]);    
                this.consume(TokenTypes.OpenBraceDingoToken);
                this.Stmtlist(aux3/*o*/);
                //stack.push(TokenTypes.CloseBraceDingoToken);
                entries.push({
                    "id": aux4 + 4,
                    "parentId": aux3,
                    "state": TokenTypes[TokenTypes.CloseBraceDingoToken]
                    });
                    this.tokens[ind]["Fun"] = 0;
                    ind++; 
                this.tokens[ind ]["Scope"] = scopeCount;
                console.log(this.tokens[ind ]);    
                this.consume(TokenTypes.CloseBraceDingoToken);
                this.Elseiflist(aux3/*o*/);
                this.Else(aux3/*o*/);
                break;

            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }

    private Stmtincr(id/*o*/){
        ///stack.push("Stmtincr");
        //console.log(stack);
        let aux = id;
        let aux2 = id + 1
        entries.push({
            "id": aux2,
            "parentId": aux,
            "state": "Stmtincr"
            });
        switch(this.currentToken.type){
            case TokenTypes.IdentifierDingo:
                this.Id(aux2/*o*/);
                // stack.push(TokenTypes.PlusPlusDingoToken);
                 let aux3 = aux2;
                 let aux4 = aux2 + 1;

                entries.push({
                    "id": aux4,
                    "parentId": aux3,
                    "state": TokenTypes[TokenTypes.PlusPlusDingoToken]
                    });
                    this.tokens[ind]["Fun"] = 0;
                    ind++; 
                this.tokens[ind ]["Scope"] = scopeCount;
                console.log(this.tokens[ind ]);    
                this.consume(TokenTypes.PlusPlusDingoToken);
                 //stack.push(TokenTypes.SemicolonDingoToken);
                 entries.push({
                    "id": aux4 + 1,
                    "parentId": aux3,
                    "state": TokenTypes[TokenTypes.SemicolonDingoToken]
                    });
                    this.tokens[ind]["Fun"] = 0;
                    ind++; 
                this.tokens[ind]["Scope"] = scopeCount;
                console.log(this.tokens[ind]);    
                this.consume(TokenTypes.SemicolonDingoToken);
                break;

            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }

    private Stmtlist(id/*o*/){
        //stack.push("Stmtlist");
        //console.log(stack);

        let aux = id;
        let aux2 = id + 1
        entries.push({
            "id": aux2,
            "parentId": aux,
            "state": "Stmtlist"
            });

        switch(this.currentToken.type){
            case TokenTypes.SemicolonDingoToken:
                this.C(aux2/*o*/);
                break;
            case TokenTypes.BreakDingoKeyword:
                this.C(aux2/*o*/);
                break;
            case TokenTypes.IdentifierDingo:
                this.C(aux2/*o*/);
                break;
            case TokenTypes.IfDingoKeyword:
                this.C(aux2/*o*/);
                break;
            case TokenTypes.LoopDingoKeyword:
                this.C(aux2/*o*/);
                break;
            case TokenTypes.CloseBraceDingoToken:
                this.C(aux2/*o*/);
                break;
            case TokenTypes.ReturnDingoKeyword:
                this.C(aux2/*o*/);
                break;

            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }

    private Stmtloop(id/*o*/){
        //stack.push("Stmtloop");
        //console.log(stack);
        let aux = id;
        let aux2 = id + 1
        entries.push({
            "id": aux2,
            "parentId": aux,
            "state": "Stmtloop"
            });
        switch(this.currentToken.type){
            case TokenTypes.LoopDingoKeyword:
            //stack.push(TokenTypes.LoopDingoKeyword);
            
            let aux3 = aux2;
            let aux4 = aux2 + 1;

                entries.push({
                    "id": aux4,
                    "parentId": aux3,
                    "state": TokenTypes[TokenTypes.LoopDingoKeyword]
                    });
                    this.tokens[ind]["Fun"] = 0;
                    ind++; 
                this.tokens[ind ]["Scope"] = scopeCount;
                console.log(this.tokens[ind ]);    
                this.consume(TokenTypes.LoopDingoKeyword);
                //stack.push(TokenTypes.OpenBraceDingoToken);
                entries.push({
                    "id": aux4 + 1,
                    "parentId": aux3,
                    "state": TokenTypes[TokenTypes.OpenBraceDingoToken]
                    });
                    this.tokens[ind]["Fun"] = 0;
                    ind++; 
                    scopeCount++;
                this.tokens[ind ]["Scope"] = scopeCount + 1;
                console.log(this.tokens[ind ]);    
                this.consume(TokenTypes.OpenBraceDingoToken);
                this.Stmtlist(aux2/*o*/);
                //stack.push(TokenTypes.CloseBraceDingoToken);
                entries.push({
                    "id": aux4 + 2,
                    "parentId": aux3,
                    "state": TokenTypes[TokenTypes.CloseBraceDingoToken]
                    });
                    this.tokens[ind]["Fun"] = 0;
                    ind++; 
                this.tokens[ind ]["Scope"] = scopeCount;
                console.log(this.tokens[ind ]);    
                this.consume(TokenTypes.CloseBraceDingoToken);
                break;

            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }

    private Stmtreturn(id/*o*/){
        //stack.push("Stmtreturn");
        //console.log(stack);
        let aux = id;
        let aux2 = id + 1
        entries.push({
            "id": aux2,
            "parentId": aux,
            "state": "Stmtreturn"
            });
        switch(this.currentToken.type){
            case TokenTypes.ReturnDingoKeyword:
            //stack.push(TokenTypes.ReturnDingoKeyword);
            let aux3 = aux2;
            let aux4 = aux2 + 1;

                entries.push({
                    "id": aux4,
                    "parentId": aux3,
                    "state": TokenTypes[TokenTypes.ReturnDingoKeyword]
                    });
                    this.tokens[ind]["Fun"] = 0;
                    ind++; 
                this.tokens[ind ]["Scope"] = scopeCount;
                console.log(this.tokens[ind ]);    
                this.consume(TokenTypes.ReturnDingoKeyword);
                this.Expr(aux3/*o*/);
                //stack.push(TokenTypes.SemicolonDingoToken);
                entries.push({
                    "id": aux4 + 1,
                    "parentId": aux3,
                    "state": TokenTypes[TokenTypes.SemicolonDingoToken]
                    });
                    this.tokens[ind]["Fun"] = 0;
                    ind++; 
                this.tokens[ind ]["Scope"] = scopeCount;
                console.log(this.tokens[ind]);    
                this.consume(TokenTypes.SemicolonDingoToken);
                break;

            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }

    private Vardef(id/*o*/){
        //stack.push("Vardef");
        //console.log(stack);
        let aux = id;
        let aux2 = id + 1
        entries.push({
            "id": aux2,
            "parentId": aux,
            "state": "Vardef"
            });
        switch(this.currentToken.type){
            case TokenTypes.VarDingoKeyword:
            //stack.push(TokenTypes.VarDingoKeyword);
            let aux3 = aux2;
            let aux4 = aux2 + 1;

                entries.push({
                    "id": aux4,
                    "parentId": aux3,
                    "state": TokenTypes[TokenTypes.VarDingoKeyword]
                    });
                    this.tokens[ind]["Fun"] = 0;
                    ind++; 
                this.tokens[ind ]["Scope"] = scopeCount;
                console.log(this.tokens[ind ]);    
                this.consume(TokenTypes.VarDingoKeyword);
                this.Varlist(aux2/*o*/);
                //stack.push(TokenTypes.SemicolonDingoToken);
                entries.push({
                    "id": aux4 + 1,
                    "parentId": aux3,
                    "state": TokenTypes[TokenTypes.SemicolonDingoToken]
                    });
                    this.tokens[ind]["Fun"] = 0;
                    ind++; 
                this.tokens[ind ]["Scope"] = scopeCount;
                console.log(this.tokens[ind ]);    
                this.consume(TokenTypes.SemicolonDingoToken);
                break;

            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }

    private Vardeflist(id/*o*/){
        //stack.push("Vardeflist");
        //console.log(stack);

        let aux = id;
        let aux2 = id + 1
        entries.push({
            "id": aux2,
            "parentId": aux,
            "state": "Vardeflist"
            });

        switch(this.currentToken.type){
            case TokenTypes.SemicolonDingoToken:
                this.B(aux2/*o*/);
                break;
            case TokenTypes.BreakDingoKeyword:
                this.B(aux2/*o*/);
                break;
            case TokenTypes.IdentifierDingo:
                this.B(aux2/*o*/);
                break;
            case TokenTypes.IfDingoKeyword:
                this.B(aux2/*o*/);
                break;
            case TokenTypes.CloseBraceDingoToken:
                this.B(aux2/*o*/);
                break;
            case TokenTypes.ReturnDingoKeyword:
                this.B(aux2/*o*/);
                break;
            case TokenTypes.VarDingoKeyword:
                this.B(aux2/*o*/);
                break;

            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }

    private Varlist(id/*o*/){
        //stack.push("Varlist");
        //console.log(stack);
        let aux = id;
        let aux2 = id + 1
        entries.push({
            "id": aux2,
            "parentId": aux,
            "state": "Varlist"
            });
        switch(this.currentToken.type){
            case TokenTypes.IdentifierDingo:
                this.Idlist(aux2/*o*/);
                break;
            
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }
        
}