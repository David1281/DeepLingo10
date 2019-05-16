export enum TokenTypes{
    //Keywords
    BreakDingoKeyword,
    ElseDingoKeyword,
    ElseIfDingoKeyword,
    IfDingoKeyword,
    LoopDingoKeyword,
    ReturnDingoKeyword,
    VarDingoKeyword,

    //Operators
    MinusDingoToken,
    MinusMinusDingoToken,
    PlusDingoToken,
    PlusPlusDingoToken,
    AsteriskDingoToken,
    SlashDingoToken,
    PercentDingoToken,
    ExclamationDingoToken,
    AmpersandAmpersandDingoToken,
    BarBarDingoToken,
    EqualsEqualsDingoToken, 
    EqualsDingoToken,
    ExclamationEqualsDingoToken,
    GreaterThanDingoToken,
    LessThanDingoToken,
    GreaterThanEqualsDingoToken,
    LessThanEqualsDingoToken,

    //Literals
    IntegerLiteralDingo,
    CharacterLiteralDingo,
    StringLiteralDingo,

     //Identifiers
    IdentifierDingo,

    OpenParenDingoToken,
    OpenBraceDingoToken,
    CloseBraceDingoToken,
    CloseParenDingoToken,
    OpenBracketDingoToken,
    CloseBracketDingoToken,
    DotDingoToken,
    ColonDingoToken,
    SemicolonDingoToken,
    CommaDingoToken,

    //Functions
    // PrintIDingoToken,
    // PrintCDingoToken,
    // PrintSDingoToken,
    // PrintLnDingoToken,
    // ReadIDingoToken,
    // ReadSDingoToken,
    // NewDingoToken,
    // SizeDingoToken,
    // AddDingoToken,
    // GetDingoToken,
    // SetDingoToken,
    // MainDingoToken,

    //Comments
    SingleLineCommentTriviaDingo,
    MultiLineCommentTriviaDingo,

    // Others
    PesoToken,
    EndOfFileToken,
    WhiteSpace,
    NewLineTrivia,
    QuoteDingoToken,
}