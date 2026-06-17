// src/backend/services/DnsService.ts
import dns from 'dns';
import { promisify } from 'util';

const resolveTxt = promisify(dns.resolveTxt);

export interface DnsVerificationResult {
  isSpfValid: boolean;
  isDkimValid: boolean;
  isDmarcValid: boolean;
  rawRecords: {
    spf?: string[];
    dkim?: string[];
    dmarc?: string[];
  };
}

export class DnsService {
  /**
   * Verifies the SPF, DKIM, and DMARC records for a given domain.
   * Note: For DKIM, a selector is typically required (e.g., google._domainkey.domain.com).
   * For simplicity in this wizard, we'll check the base domain and common selectors if provided.
   */
  public static async verifyDomain(domain: string, dkimSelector: string = 'eb'): Promise<DnsVerificationResult> {
    const result: DnsVerificationResult = {
      isSpfValid: false,
      isDkimValid: false,
      isDmarcValid: false,
      rawRecords: {}
    };

    try {
      // 1. Verify SPF (txt records at base domain)
      try {
        const txtRecords = await resolveTxt(domain);
        const spfRecord = txtRecords.find(records => records.some(r => r.startsWith('v=spf1')));
        if (spfRecord) {
          result.isSpfValid = true;
          result.rawRecords.spf = spfRecord;
        }
      } catch (err) {
        console.warn(`[DNS_SERVICE] SPF check failed for ${domain}:`, err);
      }

      // 2. Verify DKIM (txt records at selector._domainkey.domain)
      try {
        const dkimDomain = `${dkimSelector}._domainkey.${domain}`;
        const dkimRecords = await resolveTxt(dkimDomain);
        const dkimRecord = dkimRecords.find(records => records.some(r => r.startsWith('v=DKIM1')));
        if (dkimRecord) {
          result.isDkimValid = true;
          result.rawRecords.dkim = dkimRecord;
        }
      } catch (err) {
        console.warn(`[DNS_SERVICE] DKIM check failed for ${dkimSelector}._domainkey.${domain}:`, err);
      }

      // 3. Verify DMARC (txt records at _dmarc.domain)
      try {
        const dmarcDomain = `_dmarc.${domain}`;
        const dmarcRecords = await resolveTxt(dmarcDomain);
        const dmarcRecord = dmarcRecords.find(records => records.some(r => r.startsWith('v=DMARC1')));
        if (dmarcRecord) {
          result.isDmarcValid = true;
          result.rawRecords.dmarc = dmarcRecord;
        }
      } catch (err) {
        console.warn(`[DNS_SERVICE] DMARC check failed for _dmarc.${domain}:`, err);
      }

      return result;
    } catch (err: any) {
      console.error(`[DNS_SERVICE] Unexpected error during verification for ${domain}:`, err);
      return result;
    }
  }

  /**
   * Generates the expected DNS records for a domain to be "Ready to Send".
   */
  public static getRequiredRecords(domain: string, dkimSelector: string = 'eb') {
    return {
      spf: {
        type: 'TXT',
        host: '@',
        value: 'v=spf1 include:_spf.effectivebuzz.online ~all'
      },
      dkim: {
        type: 'TXT',
        host: `${dkimSelector}._domainkey`,
        value: `v=DKIM1; k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC3...` // Placeholder public key
      },
      dmarc: {
        type: 'TXT',
        host: '_dmarc',
        value: 'v=DMARC1; p=none; rua=mailto:dmarc@effectivebuzz.online'
      }
    };
  }
}
