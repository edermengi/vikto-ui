import * as React from 'react'
import Avatar from 'avataaars'

const avatarOptions = {
    avatarStyle: ['Circle', 'Transparent'],
    topType: ["NoHair", "Hat", "Turban", "WinterHat2", "WinterHat4", "LongHairBob", "LongHairCurly",
        "LongHairDreads", "LongHairFro", "LongHairNotTooLong", "LongHairMiaWallace", "LongHairStraight2",
        "ShortHairDreads01", "ShortHairFrizzle", "ShortHairShortCurly", "ShortHairShortRound", "ShortHairSides",
        "ShortHairTheCaesarSidePart"],
    accessoriesType: ["Blank", "Kurt", "Prescription01", "Prescription02", "Round", "Sunglasses", "Wayfarers"],
    hairColor: ["Auburn", "Black", "Blonde", "BlondeGolden", "Brown", "BrownDark", "PastelPink", "Blue",
        "Platinum", "Red", "SilverGray"],
    facialHairType: ["Blank", "BeardMedium", "BeardLight", "BeardMajestic", "MoustacheFancy", "MoustacheMagnum"],
    clotheType: ["BlazerShirt", "BlazerSweater", "CollarSweater", "GraphicShirt", "Hoodie", "Overall",
        "ShirtCrewNeck", "ShirtScoopNeck", "ShirtVNeck"],
    clotheColor: ["Black", "Blue01", "Blue02", "Blue03", "Gray01", "Gray02", "Heather", "PastelBlue", "PastelGreen",
        "PastelOrange", "PastelRed", "PastelYellow", "Pink", "Red", "White"],
    eyeType: ["Close", "Cry", "Default", "Dizzy", "EyeRoll", "Happy", "Hearts", "Side", "Squint", "Surprised",
        "Wink", "WinkWacky"],
    eyebrowType: ["Angry", "AngryNatural", "Default", "DefaultNatural", "FlatNatural", "RaisedExcited",
        "RaisedExcitedNatural", "SadConcerned", "SadConcernedNatural", "UnibrowNatural", "UpDown", "UpDownNatural"],
    mouthType: ["Concerned", "Default", "Disbelief", "Eating", "Grimace", "Sad", "ScreamOpen", "Serious", "Smile",
        "Tongue", "Twinkle", "Vomit"],
    skinColor: ["Tanned", "Yellow", "Pale", "Light", "Brown", "DarkBrown", "Black"],
};


function randomAvatarValue() {
    let res = {};
    for (const option of Object.keys(avatarOptions)) {
        const optionValues = avatarOptions[option];
        res[option] = optionValues[Math.floor(Math.random() * optionValues.length)];
    }
    return res;
}


function Avataar() {

    return (
        <Avatar
            style={{width: '100px', height: '100px'}}
            {...randomAvatarValue()}
        />
    );
}

export {Avataar}








