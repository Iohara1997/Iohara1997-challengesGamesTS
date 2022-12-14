"use strict";
exports.__esModule = true;
exports.slotCadence = void 0;
/**
 * Anticipator configuration. Has all information needed to check anticipator.
 * @param columnSize It's the number of columns the slot machine has.
 * @param minToAnticipate It's the minimum number of symbols to start anticipation.
 * @param maxToAnticipate It's the maximum number of symbols to end anticipation.
 * @param anticipateCadence It's the cadence value when has anticipation.
 * @param defaultCadence It's the cadence value when don't has anticipation.
 */
var anticipatorConfig = {
    columnSize: 5,
    minToAnticipate: 2,
    maxToAnticipate: 3,
    anticipateCadence: 2,
    defaultCadence: 0.25
};
/**
 * Game rounds with special symbols position that must be used to generate the SlotCadences.
 */
var gameRounds = {
    roundOne: {
        specialSymbols: [
            { column: 0, row: 2 },
            { column: 1, row: 3 },
            { column: 3, row: 4 },
        ]
    },
    roundTwo: {
        specialSymbols: [
            { column: 0, row: 2 },
            { column: 0, row: 3 },
        ]
    },
    roundThree: {
        specialSymbols: [
            { column: 4, row: 2 },
            { column: 4, row: 3 },
        ]
    }
};
/**
 * This must be used to get all game rounds cadences.
 */
var slotMachineCadences = { roundOne: [], roundTwo: [], roundThree: [] };
/**
 * This function receives an array of coordinates relative to positions in the slot machine's matrix.
 * This array is the positions of the special symbols.
 * And it has to return a slot machine stop cadence.
 * @param symbols Array<SlotCoordinate> positions of the special symbols. Example: [{ column: 0, row: 2 }, { column: 2, row: 3 }]
 * @returns SlotCadence Array of numbers representing the slot machine stop cadence.
 */
function slotCadence(symbols) {
    var anticipateCadence = anticipatorConfig.anticipateCadence, defaultCadence = anticipatorConfig.defaultCadence, columnSize = anticipatorConfig.columnSize;
    var slotCadence = [0];
    var accumulated = 0;
    var _loop_1 = function (column) {
        var countSpecialSymbols = symbols.reduce(function (acc, curr) {
            if (curr.column === column)
                acc++;
            return acc;
        }, 0);
        if (anticipatorConfig.maxToAnticipate <= countSpecialSymbols || anticipatorConfig.minToAnticipate > countSpecialSymbols) {
            accumulated += defaultCadence;
        }
        else {
            accumulated += anticipateCadence;
        }
        slotCadence.push(accumulated);
    };
    for (var column = 0; column < columnSize - 1; column++) {
        _loop_1(column);
    }
    return slotCadence;
}
exports.slotCadence = slotCadence;
/**
 * Get all game rounds and return the final cadences of each.
 * @param rounds RoundsSymbols with contains all rounds special symbols positions.
 * @return RoundsCadences has all cadences for each game round.
 */
function handleCadences(rounds) {
    slotMachineCadences.roundOne = slotCadence(rounds.roundOne.specialSymbols);
    slotMachineCadences.roundTwo = slotCadence(rounds.roundTwo.specialSymbols);
    slotMachineCadences.roundThree = slotCadence(rounds.roundThree.specialSymbols);
    return slotMachineCadences;
}
console.log('CADENCES: ', handleCadences(gameRounds));
