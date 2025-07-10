export interface DiceState {
    rolls: number[][]; //2d matrica - koji roll po redu je šta? 13x6
    currentRollIdx: number; //na koji smo trenutno?
    cheatLeft: number; //kolko ostalo cheats?
    usedRows: Record<string, number>; //pamtimo redom
    previews: Record<string, number>; //sve linije previewujemo (velika promena da bi bilo korisno mobile userima)
    gamemode: number;
  }