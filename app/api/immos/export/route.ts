import { NextResponse } from "next/server";
import ExcelJS from "exceljs";
// ⚠️ adapte l'import prisma selon ton projet
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // 1) Récupérer tous les immos
    const immos = await prisma.immo.findMany({
      //  orderBy: { createdAt: "desc" }, // adapte si besoin
      include: {
        person: true,
      },
    });

    //console.log("immos", immos);

    // 2) Créer le fichier Excel
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Immos");

    // 3) Définir les colonnes (⚠️ adapte les champs à ton modèle Immo)
    sheet.columns = [
      { header: "Prénon", key: "firstname", width: 28 },
      { header: "Nom", key: "lastname", width: 30 },
      { header: "Nom dossier", key: "username", width: 40 },
      { header: "Analyse faite", key: "anaDone", width: 18 },
      { header: "Offre acceptée", key: "offerAccepted", width: 14 },
      { header: "Statut", key: "immoStatus", width: 16 },
      { header: "Notes", key: "notes", width: 20 },
    ];

    // 4) Injecter les lignes
    immos.forEach((immo: any) => {
      sheet.addRow({
        firstname: immo.person.firstname ?? "",
        lastname: immo.person.lastname ?? "",
        username: immo.username ?? "",
        anaDone: immo.anaDone ?? "",
        offerAccepted: immo.offerAccepted ?? "",
        immoStatus: immo.immoStatus ?? "",
        notes: immo.notes ?? "",
        /*         createdAt: immo.createdAt
          ? new Date(immo.createdAt).toISOString().slice(0, 10)
          : "", */
      });
    });

    // Un peu de style (optionnel)
    sheet.getRow(1).font = { bold: true };
    sheet.views = [{ state: "frozen", ySplit: 1 }];

    // 5) Envoyer le fichier
    const buffer = await workbook.xlsx.writeBuffer();
    const fileName = `immos_${new Date().toISOString().slice(0, 10)}.xlsx`;

    return new NextResponse(buffer as any, {
      status: 200,
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="${fileName}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { message: "Erreur lors de la génération du fichier Excel." },
      { status: 500 }
    );
  }
}
