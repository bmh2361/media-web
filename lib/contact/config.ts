export type ContactConfiguration = {
  webhookUrl: string | null;
  webhookSecret: string | null;
  allowedOrigins: string[];
  notificationDestination: string | null;
  errorMonitoringDsn: string | null;
  crmWebhookUrl: string | null;
  emailProvider: string | null;
  fileUploadProvider: string | null;
};

const optional = (value: string | undefined) => value?.trim() || null;

export function getContactConfiguration(): ContactConfiguration {
  return {
    webhookUrl: optional(process.env.CONTACT_WEBHOOK_URL),
    webhookSecret: optional(process.env.CONTACT_WEBHOOK_SECRET),
    allowedOrigins: (process.env.CONTACT_ALLOWED_ORIGINS || "")
      .split(",")
      .map((origin) => origin.trim())
      .filter(Boolean),
    notificationDestination: optional(process.env.CONTACT_NOTIFICATION_DESTINATION),
    errorMonitoringDsn: optional(process.env.CONTACT_ERROR_MONITORING_DSN),
    crmWebhookUrl: optional(process.env.CONTACT_CRM_WEBHOOK_URL),
    emailProvider: optional(process.env.CONTACT_EMAIL_PROVIDER),
    fileUploadProvider: optional(process.env.CONTACT_FILE_UPLOAD_PROVIDER)
  };
}
