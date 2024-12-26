import React from 'react';
import { GameType } from '../types/game';
import { generateBingoCard } from '../utils/gameUtils';
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import { Printer } from 'lucide-react';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  card: {
    width: '48%',
    marginBottom: 20,
    border: 1,
    borderColor: '#000'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottom: 1,
    borderColor: '#000',
    padding: 5
  },
  headerCell: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottom: 1,
    borderColor: '#000'
  },
  cell: {
    width: '20%',
    padding: 5,
    textAlign: 'center',
    fontSize: 12,
    borderRight: 1,
    borderColor: '#000'
  }
});

interface PrintCardsProps {
  gameType: GameType;
}

const BingoCardPDF: React.FC<{ card: number[][] }> = ({ card }) => (
  <View style={styles.card}>
    <View style={styles.header}>
      {['B', 'I', 'N', 'G', 'O'].map((letter) => (
        <Text key={letter} style={styles.headerCell}>{letter}</Text>
      ))}
    </View>
    {card.map((row, i) => (
      <View key={i} style={styles.row}>
        {row.map((num, j) => (
          <Text key={j} style={styles.cell}>
            {num === 0 ? 'FREE' : num}
          </Text>
        ))}
      </View>
    ))}
  </View>
);

export const PrintCards: React.FC<PrintCardsProps> = ({ gameType }) => {
  const cards = Array(4).fill(null).map(() => generateBingoCard());

  const BingoDocument = () => (
    <Document>
      <Page size="LETTER" style={styles.page}>
        {cards.map((card, i) => (
          <BingoCardPDF key={i} card={card} />
        ))}
      </Page>
    </Document>
  );

  return (
    <PDFDownloadLink
      document={<BingoDocument />}
      fileName={`bingo-cards-${gameType}.pdf`}
      className="flex items-center justify-center gap-2 bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors font-semibold"
    >
      <Printer className="w-5 h-5" />
      Print Bingo Cards
    </PDFDownloadLink>
  );
};