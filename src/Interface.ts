export interface ExpressionInterface {
    equationInputStr: string;
    isEquationShown: boolean;
    equationParamters: {
        equationParamtersArray: ExpressionParameters[];
        constant: number;
    };
}
export interface ExpressionParameters {
    power: number;
    coefficient: number;
}