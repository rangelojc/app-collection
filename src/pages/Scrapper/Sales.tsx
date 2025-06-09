import CustomHelmet from "@/components/CustomHelmet";
import {
  ContentBox,
  ContentHeader,
  ContentTitle,
  Wrapper,
} from "@/components/LayoutWidgets";
import { Button } from "@/components/ui/button";
import ExcelExportButton from "@/features/ExcelExportButton";
import * as cheerio from "cheerio";
import { useState } from "react";

const SalesScrapper = () => {
  const [scrappedData, setScrappedData] = useState<any[]>([]);
  const [input, setInput] = useState("");

  const handleScrape = () => {
    const $ = cheerio.load(input);
    const parsedRows: any[] = [];

    $("tbody.data-table tr.tableBodyBody").each((_, element) => {
      const cells = $(element).find("td");
      parsedRows.push({
        date: $(cells[0]).text().trim(),
        grossSales: $(cells[1])?.text().trim(),
        refunds: $(cells[2])?.text().trim(),
        discounts: $(cells[3])?.text().trim(),
        netSales: $(cells[4])?.text().trim(),
        costOfGoods: $(cells[5])?.text().trim(),
        grossProfit: $(cells[6])?.text().trim(),
        margin: $(cells[7])?.text().trim(),
        taxes: $(cells[8])?.text().trim(),
      });
    });

    setScrappedData(parsedRows);
  };

  return (
    <Wrapper>
      <CustomHelmet title={"Sales Scrapper"} />
      <ContentTitle text={"Sales Scrapper"} />
      <ContentBox>
        <ContentHeader>
          <ExcelExportButton data={scrappedData} category="sales" />
        </ContentHeader>

        <textarea
          rows={10}
          className="w-full p-2 border rounded mb-2"
          placeholder="Paste the HTML content here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <Button onClick={handleScrape}>Scrape Table</Button>

        {scrappedData.length > 0 && (
          <div className="overflow-auto mt-2">
            <table className="min-w-full border text-sm text-left">
              <thead>
                <tr>
                  {Object.keys(scrappedData[0]).map((key) => (
                    <th key={key} className="border px-2 py-1 ">
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {scrappedData.map((row, i) => (
                  <tr key={i}>
                    {Object.values(row).map((val, j) => (
                      <td key={j} className="border px-2 py-1">
                        {String(val)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </ContentBox>
    </Wrapper>
  );
};

export default SalesScrapper;
