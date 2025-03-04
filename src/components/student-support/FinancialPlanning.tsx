import { Anchor, Box } from '@mantine/core';

import { Paragraph, Title } from '../ui';
import { CollapsibleContent } from '../shared/v3';
import { useCallback, useEffect, useState } from 'react';
import { IContentfulEntry } from '@/types';

export default function FinancialPlanning() {
  const [kenyanFees, setKenyanFees] = useState<Array<IContentfulEntry>>([]);
  const [intlFees, setIntlFees] = useState<Array<IContentfulEntry>>([]);

  const fetchFeeStructure = useCallback(async () => {
    try {
      const response = await fetch(`/api/v3/fee-structure`);
      const data = await response.json();
      const filteredKenyan = data.filter(
        (item: IContentfulEntry) => item.fields.studentCategory == 'Kenyan & East African Students'
      );
      const filteredIntl = data.filter(
        (item: IContentfulEntry) => item.fields.studentCategory != 'Kenyan & East African Students'
      );
      setKenyanFees(filteredKenyan);
      setIntlFees(filteredIntl);
    } catch (error) {
      console.log('Error fetching courses:', error);
    }
  }, []);

  const handleDocumentDownload = async (feeDocument: any) => {
    try {
      const response = await fetch(`https:${feeDocument.url}`);
      if (!response.ok) throw new Error('Failed to fetch file');

      const blob = await response.blob();
      const link = document.createElement('a');

      link.href = URL.createObjectURL(blob);
      link.download = feeDocument.fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  useEffect(() => {
    fetchFeeStructure();
  }, [fetchFeeStructure]);

  return (
    <Box className="w-full">
      <CollapsibleContent
        key={`finance-plan-1`}
        title="Fee Structure"
        content={
          <Box>
            <Paragraph className="mb-4">
              You can view or download the fee structures below for various programs.
            </Paragraph>

            <Title label="Kenyan & East African Students" color="black" size="20px" />
            <ul>
              {kenyanFees.map((fee) => (
                <li key={fee.fields.name}>
                  <Box
                    className="my-4 cursor-pointer"
                    onClick={() => handleDocumentDownload(fee.fields.document.fields.file)}
                  >
                    <Paragraph className="text-admiDarkOrange" fontWeight={900}>
                      {fee.fields.displayName}
                    </Paragraph>
                  </Box>
                </li>
              ))}
            </ul>

            <Title label="International Students" color="black" size="20px" />

            <ul>
              {intlFees.map((fee) => (
                <li key={fee.fields.name}>
                  <Box
                    className="my-4 cursor-pointer"
                    onClick={() => handleDocumentDownload(fee.fields.document.fields.file)}
                  >
                    <Paragraph className="text-admiDarkOrange" fontWeight={900}>
                      {fee.fields.displayName}
                    </Paragraph>
                  </Box>
                </li>
              ))}
            </ul>
          </Box>
        }
      />
      <CollapsibleContent
        key={`finance-plan-2`}
        title="Paying your Fees"
        content={
          <Box>
            <Paragraph fontWeight={900} size="24px">
              How to Pay
            </Paragraph>

            <Paragraph fontWeight={900} className="mb-2 mt-6">
              Option 1: NCBA BANK
            </Paragraph>
            <Paragraph className="py-1">Account Name: Africa Digital Media Institute</Paragraph>
            <Paragraph className="py-1">Bank: NCBA Bank</Paragraph>
            <Paragraph className="py-1">Branch: Harambee Avenue</Paragraph>
            <Paragraph className="py-1">Account No (KSH): 2665570197</Paragraph>
            <Paragraph className="py-1">Account No (USD): 2665570071</Paragraph>
            <Paragraph className="py-1">Bank Code: 07000</Paragraph>
            <Paragraph className="py-1">Branch Code: 110</Paragraph>
            <Paragraph className="py-1">Swift Code: CBAFKENX</Paragraph>

            <Paragraph fontWeight={900} className="mb-2 mt-6">
              Option 2: Kingdom Bank
            </Paragraph>
            <Paragraph className="py-1">Account Name: Africa Digital Media Institute</Paragraph>
            <Paragraph className="py-1">Bank: Jamii Bora Bank</Paragraph>
            <Paragraph className="py-1">Branch: Koinange Branch</Paragraph>
            <Paragraph className="py-1">Account No:1001801622002</Paragraph>
            <Paragraph className="py-1">Bank Branch Code:02</Paragraph>
            <Paragraph className="py-1">Swift Code: CIFIKENA</Paragraph>

            <Paragraph fontWeight={900} className="mb-2 mt-6">
              Option 3: MPESA
            </Paragraph>
            <Paragraph className="py-1">Mpesa Menu</Paragraph>
            <Paragraph className="py-1">Lipa Na Mpesa</Paragraph>
            <Paragraph className="py-1">Select Paybill</Paragraph>
            <Paragraph className="py-1">Enter Business Number:836036</Paragraph>
            <Paragraph className="py-1">Enter Account Number: Admission Number/Full names</Paragraph>
            <Paragraph className="py-1">Enter Amount: XXX</Paragraph>
            <Paragraph className="py-1">Mpesa Pin: XXX</Paragraph>
            <Paragraph className="py-1">Click: Confirm Mpesa notification</Paragraph>
            <Paragraph className="py-1">Account Name: Africa Digital Media Institute</Paragraph>

            <Paragraph className="mt-6">
              NB: During payment in the bank, the person paying should ensure that the Full Names of the student is
              captured with the payment details.
            </Paragraph>
          </Box>
        }
      />
      <CollapsibleContent
        key={`finance-plan-3`}
        title="Scholarships and Grants"
        content={
          <Paragraph>
            Keep an eye on this space for future opportunities to support your educational journey at ADMI.
          </Paragraph>
        }
      />
      <CollapsibleContent
        key={`finance-plan-4`}
        title="Contact Finance Office"
        content={
          <Box>
            <Paragraph>
              You can reach out to our finance office anytime during working hours Monday - Friday for any assistance.
            </Paragraph>
            <ul>
              <li>
                <Anchor href="mailto:fee@admi.ac.ke" target="_blank">
                  <Paragraph className="mt-6" fontWeight={900}>
                    Email: fee@admi.ac.ke
                  </Paragraph>
                </Anchor>
              </li>
              <li>
                <Anchor href="tel:+254770370691" target="_blank">
                  <Paragraph className="mt-6" fontWeight={900}>
                    Call: +254 770370691
                  </Paragraph>
                </Anchor>
              </li>
            </ul>
          </Box>
        }
      />
    </Box>
  );
}
