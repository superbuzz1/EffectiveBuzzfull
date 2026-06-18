// src/backend/services/QualityGuardrailService.ts

export interface QualityReport {
  spamScore: number; // 0-100 (lower is better)
  clicheMatches: string[];
}

export class QualityGuardrailService {
  private static CLICHES = [
    'revolutionary', 'disruptive', 'synergy', 'game-changer', 'paradigm shift',
    'once-in-a-lifetime', 'unprecedented', 'cutting-edge', 'best-in-class',
    'guaranteed results', 'double your revenue', '10x growth', 'low-hanging fruit',
    'thinking outside the box', 'state-of-the-art', 'world-class'
  ];

  private static SPAM_TRIGGERS = [
    '!!!', '$$$', 'FREE', 'BUY NOW', 'URGENT', 'WINNER', 'CASH', 'GUARANTEED',
    '100%', 'ACT NOW'
  ];

  /**
   * Analyzes an email draft for clichés and spam triggers.
   */
  public static analyzeDraft(subject: string, body: string): QualityReport {
    const content = `${subject} ${body}`.toLowerCase();
    const clicheMatches: string[] = [];
    
    // 1. Check for Clichés
    for (const cliche of this.CLICHES) {
      if (content.includes(cliche)) {
        clicheMatches.push(cliche);
      }
    }

    // 2. Calculate Spam Score
    let spamScore = 0;
    
    // Penalty for each spam trigger
    for (const trigger of this.SPAM_TRIGGERS) {
      const regex = new RegExp(trigger.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
      const matches = content.match(regex);
      if (matches) {
        spamScore += matches.length * 10;
      }
    }

    // Penalty for excessive capitalization
    const upperCount = (content.match(/[A-Z]/g) || []).length;
    const totalChars = content.length;
    if (totalChars > 0 && (upperCount / totalChars) > 0.3) {
      spamScore += 20;
    }

    // Penalty for too many exclamation marks
    const exclamationCount = (content.match(/!/g) || []).length;
    if (exclamationCount > 3) {
      spamScore += 15;
    }

    // Caps at 100
    spamScore = Math.min(spamScore, 100);

    return {
      spamScore,
      clicheMatches
    };
  }

  /**
   * Calculates Levenshtein distance between two strings to track human edit-delta.
   */
  public static calculateEditDelta(s1: string, s2: string): number {
    const track = Array(s2.length + 1).fill(null).map(() =>
      Array(s1.length + 1).fill(null));
    for (let i = 0; i <= s1.length; i += 1) track[0][i] = i;
    for (let j = 0; j <= s2.length; j += 1) track[j][0] = j;
    for (let j = 1; j <= s2.length; j += 1) {
      for (let i = 1; i <= s1.length; i += 1) {
        const indicator = s1[i - 1] === s2[j - 1] ? 0 : 1;
        track[j][i] = Math.min(
          track[j][i - 1] + 1, // deletion
          track[j - 1][i] + 1, // insertion
          track[j - 1][i - 1] + indicator, // substitution
        );
      }
    }
    return track[s2.length][s1.length];
  }
}
