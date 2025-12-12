import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { stackServerApp } from "@/lib/stack";
import { renderToBuffer } from "@react-pdf/renderer";
import ClientOnboardingPDF from "@/components/pdf/ClientOnboardingPDF";
import DoorDashDriverCheckInPDF from "@/components/pdf/DoorDashDriverCheckInPDF";
import AxiomCarrierOnboardingPDF from "@/components/pdf/AxiomCarrierOnboardingPDF";
import AxiomInvoicingPDF from "@/components/pdf/AxiomInvoicingPDF";
import BathroomRequestPDF from "@/components/pdf/BathroomRequestPDF";
import CargoDamageReportPDF from "@/components/pdf/CargoDamageReportPDF";
import CargoShortageOveragePDF from "@/components/pdf/CargoShortageOveragePDF";
import DriverFeedbackPDF from "@/components/pdf/DriverFeedbackPDF";
import EmployeeAssetCheckInPDF from "@/components/pdf/EmployeeAssetCheckInPDF";
import ForkliftInspectionPDF from "@/components/pdf/ForkliftInspectionPDF";
import LoadCreationRequestPDF from "@/components/pdf/LoadCreationRequestPDF";
import ULDInspectionPDF from "@/components/pdf/ULDInspectionPDF";
import WarehouseCheckInPDF from "@/components/pdf/WarehouseCheckInPDF";
import WarehouseServicesPDF from "@/components/pdf/WarehouseServicesPDF";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check if user is authenticated
    const user = await stackServerApp.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    // Fetch the submission with its form to determine the form type
    const submission = await prisma.submission.findUnique({
      where: { id },
      include: { Form: true },
    });

    if (!submission) {
      return NextResponse.json({ error: "Submission not found" }, { status: 404 });
    }

    let pdfBuffer: Buffer;
    let filename: string;

    // Get data from JSON fields
    const storedData = submission.formData as Record<string, any> || {};
    const filesData = submission.files as Record<string, any> || {};
    const formType = submission.Form?.formType;

    // Generate PDF based on form type
    switch (formType) {
      case "DOORDASH_DRIVER_CHECKIN": {
        const formData = {
          firstName: storedData.firstName || "",
          lastName: storedData.lastName || "",
          carrierName: storedData.carrierName || "",
          phoneNumber: storedData.phoneNumber || "",
          truckType: storedData.truckType || "",
          truckNumber: storedData.truckNumber || "",
          trailerNumber: storedData.trailerNumber || "",
          hasBOL: !!filesData.bol,
          submittedAt: submission.submittedAt.toISOString(),
          submissionId: submission.id,
        };
        pdfBuffer = await renderToBuffer(DoorDashDriverCheckInPDF({ formData }));
        const sanitizedName = `${storedData.firstName || "Unknown"}_${storedData.lastName || "Driver"}`
          .replace(/[^a-zA-Z0-9]/g, "_").substring(0, 50);
        filename = `DoorDash_CheckIn_${sanitizedName}_${submission.id}.pdf`;
        break;
      }

      case "AXIOM_CARRIER_ONBOARDING": {
        const formData = {
          ...storedData,
          hasHazmat: !!filesData.hazmat,
          hasCoi: !!filesData.coi,
          hasW9: !!filesData.w9,
          hasOperatingAuthority: !!filesData.operatingAuthority,
          hasCarrierBrokerAgreement: !!filesData.carrierBrokerAgreement,
          hasBankingDetails: !!filesData.bankingDetails,
          submittedAt: submission.submittedAt.toISOString(),
          submissionId: submission.id,
        };
        pdfBuffer = await renderToBuffer(AxiomCarrierOnboardingPDF({ formData }));
        const sanitizedCompany = (storedData.companyLegalName || "Unknown")
          .replace(/[^a-zA-Z0-9]/g, "_").substring(0, 50);
        filename = `Axiom_Carrier_${sanitizedCompany}_${submission.id}.pdf`;
        break;
      }

      case "AXIOM_INVOICING": {
        const formData = {
          loadNumber: storedData.loadNumber || "",
          loadAmount: storedData.loadAmount || "",
          submittedAt: submission.submittedAt.toISOString(),
          submissionId: submission.id,
        };
        pdfBuffer = await renderToBuffer(AxiomInvoicingPDF({ formData }));
        filename = `Axiom_Invoice_${storedData.loadNumber || "Unknown"}_${submission.id}.pdf`;
        break;
      }

      case "BATHROOM_REQUEST": {
        const formData = {
          bathroomLocation: storedData.bathroomLocation || "",
          bathroomType: storedData.bathroomType || "",
          itemsNeeded: storedData.itemsNeeded || [],
          otherItem: storedData.otherItem || "",
          additionalNotes: storedData.additionalNotes || "",
          firstName: storedData.firstName || "",
          lastName: storedData.lastName || "",
          submittedAt: submission.submittedAt.toISOString(),
          submissionId: submission.id,
        };
        pdfBuffer = await renderToBuffer(BathroomRequestPDF({ formData }));
        filename = `Bathroom_Request_${submission.id}.pdf`;
        break;
      }

      case "CARGO_DAMAGE_REPORT": {
        const formData = {
          damageFound: storedData.damageFound || "",
          masterAirWaybillNumber: storedData.masterAirWaybillNumber || "",
          houseAirWaybillNumber: storedData.houseAirWaybillNumber || "",
          totalPieceCount: storedData.totalPieceCount || "",
          classificationRating: storedData.classificationRating || "",
          notesDetails: storedData.notesDetails || "",
          piecesWithDamage: storedData.piecesWithDamage || "",
          inspectorFirstName: storedData.inspectorFirstName || "",
          inspectorLastName: storedData.inspectorLastName || "",
          inspectorTitle: storedData.inspectorTitle || "",
          dateTime: storedData.dateTime || "",
          time: storedData.time || "",
          hasDocuments: !!filesData.documents || !!filesData.supportingDocuments,
          submittedAt: submission.submittedAt.toISOString(),
          submissionId: submission.id,
        };
        pdfBuffer = await renderToBuffer(CargoDamageReportPDF({ formData }));
        filename = `Cargo_Damage_${storedData.masterAirWaybillNumber || "Unknown"}_${submission.id}.pdf`;
        break;
      }

      case "CARGO_SHORTAGE_OVERAGE_REPORT": {
        const formData = {
          shortageOverageFound: storedData.shortageOverageFound || "",
          masterAirWaybillNumber: storedData.masterAirWaybillNumber || "",
          shipmentEntries: storedData.shipmentEntries || [],
          additionalComments: storedData.additionalComments || [],
          inspectorFirstName: storedData.inspectorFirstName || "",
          inspectorLastName: storedData.inspectorLastName || "",
          title: storedData.title || "",
          dateTime: storedData.dateTime || "",
          time: storedData.time || "",
          submittedAt: submission.submittedAt.toISOString(),
          submissionId: submission.id,
        };
        pdfBuffer = await renderToBuffer(CargoShortageOveragePDF({ formData }));
        filename = `Cargo_ShortageOverage_${storedData.masterAirWaybillNumber || "Unknown"}_${submission.id}.pdf`;
        break;
      }

      case "DRIVER_FEEDBACK": {
        const formData = {
          driverName: storedData.driverName || "",
          urgency: storedData.urgency || "",
          preferredContact: storedData.preferredContact || "",
          feedbackTopics: storedData.feedbackTopics || [],
          otherTopic: storedData.otherTopic || "",
          submittedAt: submission.submittedAt.toISOString(),
          submissionId: submission.id,
        };
        pdfBuffer = await renderToBuffer(DriverFeedbackPDF({ formData }));
        filename = `Driver_Feedback_${submission.id}.pdf`;
        break;
      }

      case "EMPLOYEE_ASSET_CHECKIN": {
        const formData = {
          firstName: storedData.firstName || "",
          lastName: storedData.lastName || "",
          hasHeadset: storedData.hasHeadset || "",
          hasCompanyCellPhone: storedData.hasCompanyCellPhone || "",
          companyCellPhoneIMEI: storedData.companyCellPhoneIMEI || "",
          hasWorkDeskPhone: storedData.hasWorkDeskPhone || "",
          workDeskPhoneDeviceID: storedData.workDeskPhoneDeviceID || "",
          hasLaptop: storedData.hasLaptop || "",
          laptopMakeAndDeviceName: storedData.laptopMakeAndDeviceName || "",
          hasMonitor: storedData.hasMonitor || "",
          monitorMakeAndSerialNumber: storedData.monitorMakeAndSerialNumber || "",
          hasSecondMonitor: storedData.hasSecondMonitor || "",
          hasCompanyCreditCard: storedData.hasCompanyCreditCard || "",
          companyCreditCardLast4: storedData.companyCreditCardLast4 || "",
          hasSecondCompanyCreditCard: storedData.hasSecondCompanyCreditCard || "",
          hasScanner: storedData.hasScanner || "",
          scannerSerialNumber: storedData.scannerSerialNumber || "",
          hasDesktop: storedData.hasDesktop || "",
          desktopMakeAndDeviceName: storedData.desktopMakeAndDeviceName || "",
          hasTablet: storedData.hasTablet || "",
          tabletIMEI: storedData.tabletIMEI || "",
          additionalNotes: storedData.additionalNotes || "",
          submittedAt: submission.submittedAt.toISOString(),
          submissionId: submission.id,
        };
        pdfBuffer = await renderToBuffer(EmployeeAssetCheckInPDF({ formData }));
        const empName = `${storedData.firstName || "Unknown"}_${storedData.lastName || "Employee"}`
          .replace(/[^a-zA-Z0-9]/g, "_").substring(0, 50);
        filename = `Employee_Asset_${empName}_${submission.id}.pdf`;
        break;
      }

      case "FORKLIFT_INSPECTION": {
        const formData = {
          operatorFirstName: storedData.operatorFirstName || "",
          operatorLastName: storedData.operatorLastName || "",
          dateTime: storedData.dateTime || "",
          time: storedData.time || "",
          shiftNumber: storedData.shiftNumber || "",
          truckNumber: storedData.truckNumber || "",
          serialNumber: storedData.serialNumber || "",
          hourMeterReading: storedData.hourMeterReading || "",
          inspectionItems: storedData.inspectionItems || {},
          additionalComments: storedData.additionalComments || "",
          doubleCheckFirstName: storedData.doubleCheckFirstName || "",
          doubleCheckLastName: storedData.doubleCheckLastName || "",
          submittedAt: submission.submittedAt.toISOString(),
          submissionId: submission.id,
        };
        pdfBuffer = await renderToBuffer(ForkliftInspectionPDF({ formData }));
        filename = `Forklift_Inspection_${storedData.truckNumber || "Unknown"}_${submission.id}.pdf`;
        break;
      }

      case "LOAD_CREATION_REQUEST": {
        const formData = {
          customer: storedData.customer || "",
          customerReference: storedData.customerReference || "",
          driverFirstName: storedData.driverFirstName || "",
          driverLastName: storedData.driverLastName || "",
          truckNumber: storedData.truckNumber || "",
          trailer: storedData.trailer || "",
          hasRatecon: !!filesData.ratecon,
          submittedAt: submission.submittedAt.toISOString(),
          submissionId: submission.id,
        };
        pdfBuffer = await renderToBuffer(LoadCreationRequestPDF({ formData }));
        filename = `Load_Creation_${storedData.customerReference || "Unknown"}_${submission.id}.pdf`;
        break;
      }

      case "ULD_INSPECTION": {
        const formData = {
          dateTime: storedData.dateTime || "",
          time: storedData.time || "",
          customer: storedData.customer || "",
          mawb: storedData.mawb || "",
          uldNumber: storedData.uldNumber || "",
          visibleDamage: storedData.visibleDamage || "",
          damageType: storedData.damageType || [],
          damageContinued: storedData.damageContinued || "",
          comments: storedData.comments || "",
          hasBeforePlasticPic: !!filesData.beforePlasticRemoval,
          hasAfterPlasticPic: !!filesData.afterPlasticRemoval,
          submittedAt: submission.submittedAt.toISOString(),
          submissionId: submission.id,
        };
        pdfBuffer = await renderToBuffer(ULDInspectionPDF({ formData }));
        filename = `ULD_Inspection_${storedData.uldNumber || "Unknown"}_${submission.id}.pdf`;
        break;
      }

      case "WAREHOUSE_CHECKIN": {
        const formData = {
          driverFirstName: storedData.driverFirstName || "",
          driverLastName: storedData.driverLastName || "",
          licenseNumber: storedData.licenseNumber || "",
          companyName: storedData.companyName || "",
          phoneNumber: storedData.phoneNumber || "",
          submittedAt: submission.submittedAt.toISOString(),
          submissionId: submission.id,
        };
        pdfBuffer = await renderToBuffer(WarehouseCheckInPDF({ formData }));
        const driverName = `${storedData.driverFirstName || "Unknown"}_${storedData.driverLastName || "Driver"}`
          .replace(/[^a-zA-Z0-9]/g, "_").substring(0, 50);
        filename = `Warehouse_CheckIn_${driverName}_${submission.id}.pdf`;
        break;
      }

      case "WAREHOUSE_SERVICES": {
        const formData = {
          firstName: storedData.firstName || "",
          lastName: storedData.lastName || "",
          customerName: storedData.customerName || "",
          loadNumbers: storedData.loadNumbers || "",
          servicesPerformed: storedData.servicesPerformed || [],
          otherService: storedData.otherService || "",
          specialNotes: storedData.specialNotes || "",
          submittedAt: submission.submittedAt.toISOString(),
          submissionId: submission.id,
        };
        pdfBuffer = await renderToBuffer(WarehouseServicesPDF({ formData }));
        filename = `Warehouse_Services_${storedData.customerName || "Unknown"}_${submission.id}.pdf`;
        break;
      }

      case "CARRIER_ONBOARDING":
      default: {
        // Default to Client Onboarding PDF (CARRIER_ONBOARDING) - uses direct column fields
        const formData = {
          companyLegalName: submission.companyLegalName,
          division: submission.division,
          branchAddressLine1: submission.branchAddressLine1,
          branchCity: submission.branchCity,
          branchState: submission.branchState,
          branchZipCode: submission.branchZipCode,
          mc: submission.mc,
          dot: submission.dot,
          scacCode: submission.scacCode,
          primaryContactFirstName: submission.primaryContactFirstName,
          primaryContactLastName: submission.primaryContactLastName,
          primaryContactEmail: submission.primaryContactEmail,
          primaryContactPhone: submission.primaryContactPhone,
          secondaryContactFirstName: submission.secondaryContactFirstName,
          secondaryContactLastName: submission.secondaryContactLastName,
          secondaryContactEmail: submission.secondaryContactEmail,
          secondaryContactPhone: submission.secondaryContactPhone,
          escalationContactFirstName: submission.escalationContactFirstName,
          escalationContactLastName: submission.escalationContactLastName,
          escalationContactEmail: submission.escalationContactEmail,
          escalationContactPhone: submission.escalationContactPhone,
          accountsPayableFirstName: submission.accountsPayableFirstName,
          accountsPayableLastName: submission.accountsPayableLastName,
          accountsPayableEmail: submission.accountsPayableEmail,
          accountsPayablePhone: submission.accountsPayablePhone,
          billingAddressLine1: submission.billingAddressLine1,
          billingCity: submission.billingCity,
          billingState: submission.billingState,
          billingZipCode: submission.billingZipCode,
          invoicingInstructions: submission.invoicingInstructions,
          paymentMethod: submission.paymentMethod,
          w9Upload: submission.w9Upload,
          shipmentTypes: submission.shipmentTypes,
          equipmentTypes: submission.equipmentTypes,
          shipmentBuild: submission.shipmentBuild,
          additionalRequirements: submission.additionalRequirements,
          monthlyShipments: submission.monthlyShipments,
          exceptionCommunication: submission.exceptionCommunication,
          reviewFrequency: submission.reviewFrequency,
          submittedAt: submission.submittedAt.toISOString(),
          submissionId: submission.id,
          ipAddress: submission.ipAddress || "N/A",
          userAgent: submission.userAgent || "N/A",
          browser: submission.browser || "N/A",
        };

        pdfBuffer = await renderToBuffer(ClientOnboardingPDF({ formData }));

        const sanitizedCompanyName = (submission.companyLegalName || "Unknown")
          .replace(/[^a-zA-Z0-9]/g, "_")
          .substring(0, 50);
        filename = `Onboarding_${sanitizedCompanyName}_${submission.id}.pdf`;
        break;
      }
    }

    // Return PDF as download
    return new NextResponse(new Uint8Array(pdfBuffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (error: any) {
    console.error("Error generating PDF:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate PDF" },
      { status: 500 }
    );
  }
}
