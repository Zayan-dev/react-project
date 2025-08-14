import { useParams } from "react-router-dom";
import { useGetDocById } from "../../../services/document";
import { MEDIA_URL } from "../../utils/constants";

export default function DocumentById() {
  const { id } = useParams();
  const { data, isFetching } = useGetDocById(id!);

  if (isFetching) return <p className="p-6">Loading...</p>;
  if (!data) return <p className="p-6 text-red-500">No document found.</p>;
  const doc = data?.data.data;
  const recipient = doc.recipients?.[0] || {};
  const insurance = doc.insuranceResponse || {};

  return (
    <div className="p-6 flex flex-col gap-6">
      {/* Header Section */}
      <div className="flex gap-6 flex-wrap">
        {/* Left Card: Sender Info */}
        <div className="bg-white shadow rounded-lg p-6 w-80 flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-3xl">
            📄
          </div>

          <h2 className="mt-4 font-bold text-lg">{doc.sender?.name}</h2>

          {/* Status Badges */}
          <div className="flex gap-2 mt-2 flex-wrap justify-center">
            <span className="px-3 py-1 text-sm rounded-full bg-orange-100 text-orange-600">
              {doc.event}
            </span>
            <span className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-600">
              {doc.expireEnabled === "true" ? "Active" : "Inactive"}
            </span>
          </div>

          {/* Contact Info */}
          <div className="mt-4 text-sm text-gray-600 text-center">
            <p>
              <span>Sender: </span>
              {doc.sender?.email}
            </p>
            <p className="mt-1">
              <span>Recipient: </span>
              {recipient?.email}
            </p>
            <p className="mt-1">
              Created: {new Date(doc.createdAt).toLocaleDateString()}
            </p>
            <p>Expires: {new Date(doc.expireDateTime).toLocaleDateString()}</p>
          </div>

          {/* Quick Stats */}
          <div className="mt-4 w-full flex justify-around text-sm">
            <div className="text-center">
              <p className="font-bold">{doc.files?.length || 0}</p>
              <p>Files</p>
            </div>
            <div className="text-center">
              <p className="font-bold">{insurance.attachments?.length || 0}</p>
              <p>Attachments</p>
            </div>
          </div>
        </div>

        {/* Right Card: General Document Info */}
        <div className="flex-1 bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            📝 Document Information
          </h3>
          <div className="grid grid-cols-2 gap-y-4">
            <div>
              <p className="text-sm text-gray-500">Envelope ID</p>
              <p className="font-medium">{doc.envelopeId}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Event</p>
              <p className="font-medium">{doc.event}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Completed</p>
              <p className="font-medium">{doc.isCompleted ? "Yes" : "No"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">History Sent</p>
              <p className="font-medium">{doc.isHistorySent ? "Yes" : "No"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Carriers & Policy Info */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          📦 Carriers & Policy History
        </h3>
        {doc.documentContent?.map((carrierItem: any, idx: number) => (
          <div key={idx} className="mb-6 border-b pb-4 last:border-none">
            <h4 className="font-bold text-orange-600">{carrierItem.carrier}</h4>
            <div className="mt-2">
              {carrierItem.policy?.map((pol: any, pIdx: number) => (
                <div
                  key={pIdx}
                  className="flex justify-between border-b last:border-none py-2 text-sm"
                >
                  <span>Term: {pol.term}</span>
                  <span>Policy #: {pol.number}</span>
                  <span>
                    Loss Run: {pol.isLossRunHistoryReceived ? "Yes" : "No"}
                  </span>
                </div>
              ))}
            </div>
            {/* Emails */}
            <div className="mt-3 flex flex-wrap gap-2">
              {carrierItem.email?.map((mail: string, eIdx: number) => (
                <span
                  key={eIdx}
                  className="px-3 py-1 text-xs bg-gray-100 rounded-full"
                >
                  {mail}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Attachments Section */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          📎 Attachments
        </h3>
        <div className="flex flex-wrap gap-2">
          {insurance.attachments.length > 0 &&
            insurance.attachments?.map((file: string, idx: number) => (
              <span
                key={idx}
                onClick={() => window.open(`${MEDIA_URL}/${file}`, "_blank")}
                className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full cursor-pointer hover:bg-blue-200"
              >
                {file}
              </span>
            ))}
        </div>
      </div>

      {/* Files Section */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          📁 Files
        </h3>
        <div className="flex flex-wrap gap-2">
          {doc.files.length > 0 &&
            doc.files?.map((file: string, idx: number) => (
              <span
                key={idx}
                onClick={() => window.open(`${MEDIA_URL}/${file}`, "_blank")}
                className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full cursor-pointer hover:bg-blue-200"
              >
                {file}
              </span>
            ))}
        </div>
      </div>
    </div>
  );
}
