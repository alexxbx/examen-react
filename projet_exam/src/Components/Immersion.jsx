import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Composant pour afficher les kanji avec tooltip
const KanjiTooltip = ({ text }) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
    const [hoveredKanji, setHoveredKanji] = useState(null);

    const handleMouseMove = (e) => {
        const tooltipWidth = 200;
        const tooltipHeight = 80;

        let x = e.clientX + 10;
        let y = e.clientY + 10;

        if (x + tooltipWidth > window.innerWidth) {
            x = e.clientX - tooltipWidth - 10;
        }
        if (y + tooltipHeight > window.innerHeight) {
            y = e.clientY - tooltipHeight - 10;
        }

        setTooltipPosition({ x, y });
    };

    // Dictionnaire des kanji avec leurs lectures en kana, significations et exemples
    const kanjiInfo = {
        '何': {
            reading: 'なに/なん',
            meaning: 'quoi, comment, quel',
            examples: [
                { word: '何時', reading: 'なんじ', meaning: 'quelle heure' },
                { word: '何か', reading: 'なにか', meaning: 'quelque chose' },
                { word: '何人', reading: 'なんにん', meaning: 'combien de personnes' }
            ]
        },
        '一': {
            reading: 'いち',
            meaning: 'un, premier',
            examples: [
                { word: '一人', reading: 'ひとり', meaning: 'une personne' },
                { word: '一日', reading: 'いちにち', meaning: 'un jour' },
                { word: '一月', reading: 'いちがつ', meaning: 'janvier' }
            ]
        },
        '二': {
            reading: 'に',
            meaning: 'deux',
            examples: [
                { word: '二人', reading: 'ふたり', meaning: 'deux personnes' },
                { word: '二月', reading: 'にがつ', meaning: 'février' },
                { word: '二日', reading: 'ふつか', meaning: 'deux jours' }
            ]
        },
        '三': {
            reading: 'さん',
            meaning: 'trois',
            examples: [
                { word: '三人', reading: 'さんにん', meaning: 'trois personnes' },
                { word: '三月', reading: 'さんがつ', meaning: 'mars' },
                { word: '三日', reading: 'みっか', meaning: 'trois jours' }
            ]
        },
        '四': {
            reading: 'よん/し',
            meaning: 'quatre',
            examples: [
                { word: '四人', reading: 'よにん', meaning: 'quatre personnes' },
                { word: '四月', reading: 'しがつ', meaning: 'avril' },
                { word: '四日', reading: 'よっか', meaning: 'quatre jours' }
            ]
        },
        '五': {
            reading: 'ご',
            meaning: 'cinq',
            examples: [
                { word: '五人', reading: 'ごにん', meaning: 'cinq personnes' },
                { word: '五月', reading: 'ごがつ', meaning: 'mai' },
                { word: '五日', reading: 'いつか', meaning: 'cinq jours' }
            ]
        },
        '六': {
            reading: 'ろく',
            meaning: 'six',
            examples: [
                { word: '六人', reading: 'ろくにん', meaning: 'six personnes' },
                { word: '六月', reading: 'ろくがつ', meaning: 'juin' },
                { word: '六日', reading: 'むいか', meaning: 'six jours' }
            ]
        },
        '七': {
            reading: 'なな/しち',
            meaning: 'sept',
            examples: [
                { word: '七人', reading: 'しちにん', meaning: 'sept personnes' },
                { word: '七月', reading: 'しちがつ', meaning: 'juillet' },
                { word: '七日', reading: 'なのか', meaning: 'sept jours' }
            ]
        },
        '八': {
            reading: 'はち',
            meaning: 'huit',
            examples: [
                { word: '八人', reading: 'はちにん', meaning: 'huit personnes' },
                { word: '八月', reading: 'はちがつ', meaning: 'août' },
                { word: '八日', reading: 'ようか', meaning: 'huit jours' }
            ]
        },
        '九': {
            reading: 'きゅう/く',
            meaning: 'neuf',
            examples: [
                { word: '九人', reading: 'きゅうにん', meaning: 'neuf personnes' },
                { word: '九月', reading: 'くがつ', meaning: 'septembre' },
                { word: '九日', reading: 'ここのか', meaning: 'neuf jours' }
            ]
        },
        '十': {
            reading: 'じゅう',
            meaning: 'dix',
            examples: [
                { word: '十人', reading: 'じゅうにん', meaning: 'dix personnes' },
                { word: '十月', reading: 'じゅうがつ', meaning: 'octobre' },
                { word: '十日', reading: 'とおか', meaning: 'dix jours' }
            ]
        },
        '百': {
            reading: 'ひゃく',
            meaning: 'cent',
            examples: [
                { word: '百円', reading: 'ひゃくえん', meaning: '100 yens' },
                { word: '百人', reading: 'ひゃくにん', meaning: 'cent personnes' },
                { word: '百倍', reading: 'ひゃくばい', meaning: 'cent fois' }
            ]
        },
        '千': {
            reading: 'せん',
            meaning: 'mille',
            examples: [
                { word: '千円', reading: 'せんえん', meaning: '1000 yens' },
                { word: '千人', reading: 'せんにん', meaning: 'mille personnes' },
                { word: '千葉', reading: 'ちば', meaning: 'Chiba (ville)' }
            ]
        },
        '万': {
            reading: 'まん',
            meaning: 'dix mille',
            examples: [
                { word: '一万', reading: 'いちまん', meaning: 'dix mille' },
                { word: '万人', reading: 'ばんにん', meaning: 'tout le monde' },
                { word: '万年', reading: 'まんねん', meaning: 'dix mille ans' }
            ]
        },
        '円': {
            reading: 'えん',
            meaning: 'yen, cercle',
            examples: [
                { word: '円形', reading: 'えんけい', meaning: 'forme circulaire' },
                { word: '円周', reading: 'えんしゅう', meaning: 'circonférence' },
                { word: '円満', reading: 'えんまん', meaning: 'harmonieux' }
            ]
        },
        '日': {
            reading: 'にち/ひ',
            meaning: 'jour, soleil',
            examples: [
                { word: '日本', reading: 'にほん', meaning: 'Japon' },
                { word: '日曜日', reading: 'にちようび', meaning: 'dimanche' },
                { word: '毎日', reading: 'まいにち', meaning: 'tous les jours' }
            ]
        },
        '月': {
            reading: 'げつ/つき',
            meaning: 'mois, lune',
            examples: [
                { word: '月曜日', reading: 'げつようび', meaning: 'lundi' },
                { word: '今月', reading: 'こんげつ', meaning: 'ce mois' },
                { word: '月見', reading: 'つきみ', meaning: 'observation de la lune' }
            ]
        },
        '年': {
            reading: 'ねん/とし',
            meaning: 'année',
            examples: [
                { word: '今年', reading: 'ことし', meaning: 'cette année' },
                { word: '去年', reading: 'きょねん', meaning: 'l\'année dernière' },
                { word: '来年', reading: 'らいねん', meaning: 'l\'année prochaine' }
            ]
        },
        '時': {
            reading: 'じ/とき',
            meaning: 'heure, temps',
            examples: [
                { word: '時間', reading: 'じかん', meaning: 'temps, heure' },
                { word: '時計', reading: 'とけい', meaning: 'montre, horloge' },
                { word: '時代', reading: 'じだい', meaning: 'époque, période' }
            ]
        },
        '分': {
            reading: 'ふん/ぶん',
            meaning: 'minute, comprendre',
            examples: [
                { word: '分かる', reading: 'わかる', meaning: 'comprendre' },
                { word: '自分', reading: 'じぶん', meaning: 'soi-même' },
                { word: '部分', reading: 'ぶぶん', meaning: 'partie' }
            ]
        },
        '今': {
            reading: 'いま',
            meaning: 'maintenant',
            examples: [
                { word: '今日', reading: 'きょう', meaning: 'aujourd\'hui' },
                { word: '今月', reading: 'こんげつ', meaning: 'ce mois' },
                { word: '今年', reading: 'ことし', meaning: 'cette année' }
            ]
        },
        '行': {
            reading: 'い',
            meaning: 'aller, marcher',
            examples: [
                { word: '旅行', reading: 'りょこう', meaning: 'voyage' },
                { word: '銀行', reading: 'ぎんこう', meaning: 'banque' },
                { word: '行動', reading: 'こうどう', meaning: 'action, comportement' }
            ]
        },
        '見': {
            reading: 'み',
            meaning: 'voir, regarder',
            examples: [
                { word: '見学', reading: 'けんがく', meaning: 'visite d\'étude' },
                { word: '意見', reading: 'いけん', meaning: 'opinion' },
                { word: '見物', reading: 'けんぶつ', meaning: 'sightseeing' }
            ]
        },
        '探': {
            reading: 'さが',
            meaning: 'chercher, rechercher',
            examples: [
                { word: '探検', reading: 'たんけん', meaning: 'exploration' },
                { word: '探偵', reading: 'たんてい', meaning: 'détective' },
                { word: '探求', reading: 'たんきゅう', meaning: 'recherche' }
            ]
        },
        '決': {
            reading: 'き',
            meaning: 'décider, déterminer',
            examples: [
                { word: '決定', reading: 'けってい', meaning: 'décision' },
                { word: '解決', reading: 'かいけつ', meaning: 'solution' },
                { word: '決心', reading: 'けっしん', meaning: 'résolution' }
            ]
        },
        '飲': {
            reading: 'の',
            meaning: 'boire',
            examples: [
                { word: '飲料', reading: 'いんりょう', meaning: 'boisson' },
                { word: '飲酒', reading: 'いんしゅ', meaning: 'consommation d\'alcool' },
                { word: '飲み物', reading: 'のみもの', meaning: 'boisson' }
            ]
        },
        '席': {
            reading: 'せき',
            meaning: 'siège, place',
            examples: [
                { word: '座席', reading: 'ざせき', meaning: 'siège' },
                { word: '出席', reading: 'しゅっせき', meaning: 'présence' },
                { word: '欠席', reading: 'けっせき', meaning: 'absence' }
            ]
        },
        '空': {
            reading: 'あ',
            meaning: 'vide, ciel',
            examples: [
                { word: '空港', reading: 'くうこう', meaning: 'aéroport' },
                { word: '空気', reading: 'くうき', meaning: 'air' },
                { word: '空手', reading: 'からて', meaning: 'karaté' }
            ]
        },
        '次': {
            reading: 'つぎ',
            meaning: 'suivant, prochain',
            examples: [
                { word: '次回', reading: 'じかい', meaning: 'prochaine fois' },
                { word: '次第', reading: 'しだい', meaning: 'selon, dès que' },
                { word: '次々', reading: 'つぎつぎ', meaning: 'l\'un après l\'autre' }
            ]
        },
        '駅': {
            reading: 'えき',
            meaning: 'gare',
            examples: [
                { word: '駅前', reading: 'えきまえ', meaning: 'devant la gare' },
                { word: '駅員', reading: 'えきいん', meaning: 'employé de gare' },
                { word: '駅長', reading: 'えきちょう', meaning: 'chef de gare' }
            ]
        },
        '遅': {
            reading: 'おく',
            meaning: 'en retard, tard',
            examples: [
                { word: '遅刻', reading: 'ちこく', meaning: 'retard' },
                { word: '遅延', reading: 'ちえん', meaning: 'retard (transport)' },
                { word: '遅い', reading: 'おそい', meaning: 'tardif, lent' }
            ]
        },
        '切': {
            reading: 'きっ',
            meaning: 'couper, trancher',
            examples: [
                { word: '切手', reading: 'きって', meaning: 'timbre' },
                { word: '大切', reading: 'たいせつ', meaning: 'important' },
                { word: '切符', reading: 'きっぷ', meaning: 'billet' }
            ]
        },
        '注': {
            reading: 'ちゅう',
            meaning: 'verser, remarquer',
            examples: [
                { word: '注意', reading: 'ちゅうい', meaning: 'attention' },
                { word: '注文', reading: 'ちゅうもん', meaning: 'commande (au restaurant)' },
                { word: '注射', reading: 'ちゅうしゃ', meaning: 'injection' }
            ]
        },
        '文': {
            reading: 'ぶん',
            meaning: 'phrase, texte',
            examples: [
                { word: '文化', reading: 'ぶんか', meaning: 'culture' },
                { word: '文章', reading: 'ぶんしょう', meaning: 'texte' },
                { word: '文法', reading: 'ぶんぽう', meaning: 'grammaire' }
            ]
        },
        '会': {
            reading: 'かい',
            meaning: 'rencontre, réunion',
            examples: [
                { word: '会社', reading: 'かいしゃ', meaning: 'entreprise' },
                { word: '会議', reading: 'かいぎ', meaning: 'réunion' },
                { word: '会話', reading: 'かいわ', meaning: 'conversation' }
            ]
        },
        '計': {
            reading: 'けい',
            meaning: 'compter, calculer',
            examples: [
                { word: '計画', reading: 'けいかく', meaning: 'plan' },
                { word: '計算', reading: 'けいさん', meaning: 'calcul' },
                { word: '時計', reading: 'とけい', meaning: 'montre, horloge' }
            ]
        },
        '腹': {
            reading: 'はら',
            meaning: 'ventre',
            examples: [
                { word: '腹痛', reading: 'ふくつう', meaning: 'mal de ventre' },
                { word: '腹立', reading: 'はらだ', meaning: 'colère' },
                { word: '腹筋', reading: 'ふっきん', meaning: 'abdominaux' }
            ]
        },
        '痛': {
            reading: 'いた',
            meaning: 'douleur',
            examples: [
                { word: '頭痛', reading: 'ずつう', meaning: 'mal de tête' },
                { word: '痛み', reading: 'いたみ', meaning: 'douleur' },
                { word: '苦痛', reading: 'くつう', meaning: 'souffrance' }
            ]
        },
        '暑': {
            reading: 'あつ',
            meaning: 'chaud (temps)',
            examples: [
                { word: '暑さ', reading: 'あつさ', meaning: 'chaleur' },
                { word: '暑中', reading: 'しょちゅう', meaning: 'période chaude' },
                { word: '猛暑', reading: 'もうしょ', meaning: 'canicule' }
            ]
        },
        '高': {
            reading: 'たか',
            meaning: 'haut, élevé',
            examples: [
                { word: '高校', reading: 'こうこう', meaning: 'lycée' },
                { word: '高速', reading: 'こうそく', meaning: 'haute vitesse' },
                { word: '高級', reading: 'こうきゅう', meaning: 'haut de gamme' }
            ]
        },
        '要': {
            reading: 'よう',
            meaning: 'nécessaire, besoin',
            examples: [
                { word: '必要', reading: 'ひつよう', meaning: 'nécessaire' },
                { word: '要求', reading: 'ようきゅう', meaning: 'demande' },
                { word: '重要', reading: 'じゅうよう', meaning: 'important' }
            ]
        },
        '違': {
            reading: 'ちが',
            meaning: 'différent, incorrect',
            examples: [
                { word: '違反', reading: 'いはん', meaning: 'violation' },
                { word: '間違い', reading: 'まちがい', meaning: 'erreur' },
                { word: '相違', reading: 'そうい', meaning: 'différence' }
            ]
        },
        '買': {
            reading: 'か',
            meaning: 'acheter',
            examples: [
                { word: '買い物', reading: 'かいもの', meaning: 'shopping' },
                { word: '購買', reading: 'こうばい', meaning: 'achat' },
                { word: '売買', reading: 'ばいばい', meaning: 'commerce' }
            ]
        },
        '食': {
            reading: 'た',
            meaning: 'manger',
            examples: [
                { word: '食事', reading: 'しょくじ', meaning: 'repas' },
                { word: '食堂', reading: 'しょくどう', meaning: 'restaurant' },
                { word: '食品', reading: 'しょくひん', meaning: 'produit alimentaire' }
            ]
        },
        '好': {
            reading: 'す',
            meaning: 'aimer, préférer',
            examples: [
                { word: '好き', reading: 'すき', meaning: 'aimer' },
                { word: '友好', reading: 'ゆうこう', meaning: 'amitié' },
                { word: '好評', reading: 'こうひょう', meaning: 'bonne réputation' }
            ]
        },
        '新': {
            reading: 'しん',
            meaning: 'nouveau',
            examples: [
                { word: '新しい', reading: 'あたらしい', meaning: 'nouveau' },
                { word: '新年', reading: 'しんねん', meaning: 'nouvelle année' },
                { word: '新聞', reading: 'しんぶん', meaning: 'journal' }
            ]
        },
        '宿': {
            reading: 'しゅく',
            meaning: 'auberge, logement',
            examples: [
                { word: '新宿', reading: 'しんじゅく', meaning: 'Shinjuku (quartier de Tokyo)' },
                { word: '宿題', reading: 'しゅくだい', meaning: 'devoirs' },
                { word: '宿泊', reading: 'しゅくはく', meaning: 'hébergement' }
            ]
        },
        '電': {
            reading: 'でん',
            meaning: 'électricité',
            examples: [
                { word: '電車', reading: 'でんしゃ', meaning: 'train électrique' },
                { word: '電気', reading: 'でんき', meaning: 'électricité' },
                { word: '電話', reading: 'でんわ', meaning: 'téléphone' }
            ]
        },
        '車': {
            reading: 'しゃ',
            meaning: 'véhicule',
            examples: [
                { word: '電車', reading: 'でんしゃ', meaning: 'train électrique' },
                { word: '自動車', reading: 'じどうしゃ', meaning: 'voiture' },
                { word: '車両', reading: 'しゃりょう', meaning: 'véhicule' }
            ]
        },
        '符': {
            reading: 'ふ',
            meaning: 'symbole, signe',
            examples: [
                { word: '切符', reading: 'きっぷ', meaning: 'billet' },
                { word: '符号', reading: 'ふごう', meaning: 'symbole' },
                { word: '音符', reading: 'おんぷ', meaning: 'note de musique' }
            ]
        },
        '水': {
            reading: 'みず',
            meaning: 'eau',
            examples: [
                { word: '水曜日', reading: 'すいようび', meaning: 'mercredi' },
                { word: '水泳', reading: 'すいえい', meaning: 'natation' },
                { word: '水着', reading: 'みずぎ', meaning: 'maillot de bain' }
            ]
        }
    };

    // Fonction pour séparer le texte en parties (kanji et non-kanji)
    const splitText = (text) => {
        const parts = [];
        let currentPart = '';
        let currentType = '';

        for (let char of text) {
            const isKanji = /[\u4E00-\u9FAF]/.test(char);
            const newType = isKanji ? 'kanji' : 'text';

            if (currentType !== newType && currentPart) {
                parts.push({ text: currentPart, type: currentType });
                currentPart = '';
            }

            currentPart += char;
            currentType = newType;
        }

        if (currentPart) {
            parts.push({ text: currentPart, type: currentType });
        }

        return parts;
    };

    return (
        <div className="relative inline-block">
            <div
                onMouseLeave={() => {
                    setShowTooltip(false);
                    setHoveredKanji(null);
                }}
                onMouseMove={handleMouseMove}
                className="inline-block"
            >
                {splitText(text).map((part, index) => (
                    <span
                        key={index}
                        className={part.type === 'kanji' ? 'text-blue-600 font-bold cursor-help' : ''}
                        onMouseEnter={() => {
                            if (part.type === 'kanji' && kanjiInfo[part.text]) {
                                setHoveredKanji(part.text);
                                setShowTooltip(true);
                            }
                        }}
                    >
                        {part.text}
                    </span>
                ))}
            </div>
            {showTooltip && hoveredKanji && kanjiInfo[hoveredKanji] && (
                <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="fixed bg-gray-800 text-white px-3 py-2 rounded-lg text-sm z-50 shadow-lg"
                    style={{
                        left: tooltipPosition.x,
                        top: tooltipPosition.y,
                        minWidth: '200px',
                        maxWidth: '300px',
                        pointerEvents: 'none'
                    }}
                >
                    <div className="font-bold mb-1 text-lg">{hoveredKanji}</div>
                    <div className="text-gray-300 mb-2">Lecture : {kanjiInfo[hoveredKanji].reading}</div>
                    <div className="text-gray-300 mb-3">Sens : {kanjiInfo[hoveredKanji].meaning}</div>
                    <div className="border-t border-gray-600 pt-2">
                        <div className="text-gray-400 text-xs mb-1">Exemples :</div>
                        {kanjiInfo[hoveredKanji].examples.map((example, index) => (
                            <div key={index} className="mb-1">
                                <span className="text-yellow-300">{example.word}</span>
                                <span className="text-gray-400 text-xs ml-2">({example.reading})</span>
                                <div className="text-gray-300 text-xs ml-2">{example.meaning}</div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            )}
        </div>
    );
};

const scenarios = {
    airport: {
        title: "À l'aéroport",
        difficulty: "Débutant",
        steps: [
            {
                speaker: 'Agent',
                message: 'こんにちは。どこに行きますか？ (Bonjour. Où allez-vous ?)',
                options: ['パリです。 (À Paris.)', '5時です。 (Il est 5h.)', 'はい、お願いします。 (Oui, s\'il vous plaît.)'],
                correct: 0,
                explanation: "La réponse correcte est 'パリです' car la question demande la destination."
            },
            {
                speaker: 'Agent',
                message: 'パスポートを見せてください。 (Montrez-moi votre passeport, s\'il vous plaît.)',
                options: ['いいえ、要りません。 (Non, pas besoin.)', 'これです。 (Le voici.)', 'どうぞ。さようなら。 (Tenez. Au revoir.)'],
                correct: 1,
                explanation: "La réponse correcte est 'これです' car c'est la façon appropriée de présenter un document."
            },
        ]
    },
    store: {
        title: "Dans un magasin",
        difficulty: "Débutant",
        steps: [
            {
                speaker: 'Vendeur',
                message: 'いらっしゃいませ。何をお探しですか？ (Bienvenue. Que cherchez-vous ?)',
                options: ['トイレはどこですか？ (Où sont les toilettes ?)', '赤いシャツを探しています。 (Je cherche une chemise rouge.)', '今日は暑いですね。 (Il fait chaud aujourd\'hui, n\'est-ce pas ?)'],
                correct: 1,
                explanation: "La réponse correcte est '赤いシャツを探しています' car c'est une réponse appropriée à la question sur ce que vous cherchez."
            },
            {
                speaker: 'Vendeur',
                message: 'これ、いかがですか？ (Et celle-ci, qu\'en pensez-vous ?)',
                options: ['とても高いです。 (C\'est très cher.)', '私はパンを食べます。 (Je mange du pain.)', '犬が好きです。 (J\'aime les chiens.)'],
                correct: 0,
                explanation: "La réponse correcte est 'とても高いです' car c'est une réponse appropriée concernant le prix d'un article."
            },
        ]
    },
    restaurant: {
        title: "Au restaurant",
        difficulty: "Intermédiaire",
        steps: [
            {
                speaker: 'Serveur',
                message: 'ご注文はお決まりですか？ (Avez-vous choisi votre commande ?)',
                options: ['はい、ラーメンをください。 (Oui, je voudrais un ramen.)', 'おいしいですね。 (C\'est délicieux.)', 'お会計をお願いします。 (L\'addition, s\'il vous plaît.)'],
                correct: 0,
                explanation: "La réponse correcte est 'はい、ラーメンをください' car c'est une réponse appropriée à la question sur la commande."
            },
            {
                speaker: 'Serveur',
                message: 'お飲み物は何になさいますか？ (Que souhaitez-vous boire ?)',
                options: ['お水をください。 (De l\'eau, s\'il vous plaît.)', 'お腹が痛いです。 (J\'ai mal au ventre.)', 'ありがとうございます。 (Merci beaucoup.)'],
                correct: 0,
                explanation: "La réponse correcte est 'お水をください' car c'est une réponse appropriée à la question sur la boisson."
            },
        ]
    },
    train: {
        title: "Dans le train",
        difficulty: "Intermédiaire",
        steps: [
            {
                speaker: 'Passager',
                message: 'すみません、この席は空いていますか？ (Excusez-moi, ce siège est-il libre ?)',
                options: ['はい、どうぞ。 (Oui, je vous en prie.)', 'いいえ、違います。 (Non, ce n\'est pas ça.)', '駅はどこですか？ (Où est la gare ?)'],
                correct: 0,
                explanation: "La réponse correcte est 'はい、どうぞ' car c'est la réponse appropriée pour indiquer qu'un siège est libre."
            },
            {
                speaker: 'Passager',
                message: '次は何駅ですか？ (Quelle est la prochaine station ?)',
                options: ['新宿駅です。 (C\'est la station Shinjuku.)', '電車が遅れています。 (Le train est en retard.)', '切符を買います。 (Je vais acheter un billet.)'],
                correct: 0,
                explanation: "La réponse correcte est '新宿駅です' car c'est une réponse appropriée à la question sur la prochaine station."
            },
        ]
    }
};

const ImmersionMode = () => {
    const [scenarioKey, setScenarioKey] = useState(null);
    const [stepIndex, setStepIndex] = useState(0);
    const [showResult, setShowResult] = useState(null);
    const [stats, setStats] = useState({
        correct: 0,
        incorrect: 0,
        total: 0,
        completedScenarios: []
    });
    const [showExplanation, setShowExplanation] = useState(false);
    const [animateKey, setAnimateKey] = useState(0);

    const handleOptionClick = (index) => {
        const currentStep = scenarios[scenarioKey].steps[stepIndex];
        const isCorrect = index === currentStep.correct;

        setShowResult(isCorrect ? 'Bonne réponse !' : 'Mauvaise réponse.');
        setShowExplanation(true);

        setStats(prev => ({
            ...prev,
            correct: isCorrect ? prev.correct + 1 : prev.correct,
            incorrect: !isCorrect ? prev.incorrect + 1 : prev.incorrect,
            total: prev.total + 1
        }));

        setTimeout(() => {
            setShowExplanation(false);
            if (stepIndex + 1 >= scenarios[scenarioKey].steps.length) {
                setStats(prev => ({
                    ...prev,
                    completedScenarios: [...prev.completedScenarios, scenarioKey]
                }));
            }
            setStepIndex((prev) => prev + 1);
            setShowResult(null);
            setAnimateKey(prev => prev + 1);
        }, 4000);
    };

    const getProgress = () => {
        const total = Object.keys(scenarios).length;
        const completed = stats.completedScenarios.length;
        return Math.round((completed / total) * 100);
    };

    if (!scenarioKey) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 max-w-4xl mx-auto"
            >
                <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                    <h2 className="text-2xl font-bold mb-4">Mode Immersion</h2>
                    <div className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-600">Progression globale</span>
                            <span className="font-semibold">{getProgress()}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                                className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                                style={{ width: `${getProgress()}%` }}
                            ></div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.entries(scenarios).map(([key, scenario]) => (
                            <motion.button
                                key={key}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className={`p-4 rounded-lg text-left ${stats.completedScenarios.includes(key)
                                    ? 'bg-green-100 border-2 border-green-500'
                                    : 'bg-white border-2 border-gray-200 hover:border-blue-500'
                                    }`}
                                onClick={() => setScenarioKey(key)}
                            >
                                <h3 className="font-bold text-lg">{scenario.title}</h3>
                                <p className="text-sm text-gray-600">Difficulté: {scenario.difficulty}</p>
                                {stats.completedScenarios.includes(key) && (
                                    <span className="text-green-600 text-sm">✓ Complété</span>
                                )}
                            </motion.button>
                        ))}
                    </div>
                </div>
            </motion.div>
        );
    }

    const scenario = scenarios[scenarioKey];
    const step = scenario.steps[stepIndex];

    if (!step) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 max-w-xl mx-auto"
            >
                <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                    <h2 className="text-2xl font-bold mb-4">Scénario terminé !</h2>
                    <p className="mb-4">Vous avez complété le scénario "{scenario.title}"</p>
                    <div className="mb-6">
                        <h3 className="font-semibold mb-2">Statistiques du scénario</h3>
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <p className="text-sm text-gray-600">Total</p>
                                <p className="text-xl font-bold">{stats.total}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Correct</p>
                                <p className="text-xl font-bold text-green-600">{stats.correct}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Incorrect</p>
                                <p className="text-xl font-bold text-red-600">{stats.incorrect}</p>
                            </div>
                        </div>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
                        onClick={() => {
                            setScenarioKey(null);
                            setStepIndex(0);
                        }}
                    >
                        Retour au menu
                    </motion.button>
                </div>
            </motion.div>
        );
    }

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={animateKey}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-6 max-w-xl mx-auto"
            >
                <div className="bg-white rounded-lg shadow-lg p-6 relative overflow-hidden">
                    {/* Fond décoratif japonais */}
                    <div className="absolute top-0 right-0 w-32 h-32 opacity-5 pointer-events-none">
                        <svg viewBox="0 0 100 100" className="w-full h-full">
                            <path d="M50 0 L100 50 L50 100 L0 50 Z" fill="currentColor" />
                        </svg>
                    </div>

                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">{scenario.title}</h2>
                        <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                            Étape {stepIndex + 1}/{scenario.steps.length}
                        </span>
                    </div>

                    <div className="mb-8">
                        <motion.div
                            className="bg-gray-50 p-6 rounded-lg mb-6 border-l-4 border-blue-500"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <p className="font-semibold text-gray-700 mb-2">{step.speaker} :</p>
                            <div className="text-lg mt-2 bg-white p-4 rounded-lg shadow-sm">
                                <KanjiTooltip text={step.message.split(' (')[0]} />
                                <span className="text-gray-600"> ({step.message.split(' (')[1]}</span>
                            </div>
                        </motion.div>

                        <div className="space-y-4">
                            {step.options.map((opt, i) => {
                                const [japaneseText, translation] = opt.split(' (');
                                return (
                                    <motion.button
                                        key={i}
                                        whileHover={{ scale: 1.02, x: 5 }}
                                        whileTap={{ scale: 0.98 }}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3 + i * 0.1 }}
                                        className={`w-full p-4 rounded-lg text-left transition-all duration-300 ${showResult
                                            ? i === step.correct
                                                ? 'bg-green-50 border-2 border-green-500 shadow-lg'
                                                : 'bg-red-50 border-2 border-red-500'
                                            : 'bg-white border-2 border-gray-200 hover:border-blue-500 hover:shadow-md'
                                            }`}
                                        onClick={() => handleOptionClick(i)}
                                        disabled={showResult}
                                    >
                                        <div className="relative">
                                            <div className="inline-block">
                                                <KanjiTooltip text={japaneseText.trim()} />
                                            </div>
                                            <span className="text-gray-600"> ({translation}</span>
                                        </div>
                                    </motion.button>
                                );
                            })}
                        </div>
                    </div>

                    {showExplanation && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500"
                        >
                            <p className="text-blue-800">{step.explanation}</p>
                        </motion.div>
                    )}

                    {showResult && (
                        <motion.p
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className={`mt-4 font-semibold text-center text-lg ${showResult.includes('Bonne') ? 'text-green-600' : 'text-red-600'
                                }`}
                        >
                            {showResult}
                        </motion.p>
                    )}

                    {/* Barre de progression */}
                    <div className="mt-6">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <motion.div
                                className="bg-blue-600 h-2 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${((stepIndex + 1) / scenario.steps.length) * 100}%` }}
                                transition={{ duration: 0.5 }}
                            />
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default ImmersionMode;