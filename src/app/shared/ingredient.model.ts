// export class Ingredient {
//     public name: string;
//     public amount: number;

//     constructor(name: string, amount: number) {
//         this.name = name;
//         this.amount = amount;
//     }
// } This is one way to build a simple class, but there is an easier way

export class Ingredient {
    constructor(public name: string, public amount: number) {}
}