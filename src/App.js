import { useState } from "react";
import "./App.css";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mbgjjdqg";

const steps = [
  "Church",
  "Leadership",
  "Programmes",
  "Prayer",
  "Media",
  "Website",
  "Contact",
  "Review",
];

const initialData = {
  churchName: "Covenant House Family",
  yearEstablished: "",
  address: "7A Covenant Avenue, Stadium Road",
  city: "Port Harcourt",
  state: "Rivers State",
  phone: "",
  email: "",
  existingWebsite: "",
  socialLinks: "",
  vision: "",
  mission: "",
  beliefs: "",
  history: "",
  mainMessage: "",

  pastorName: "",
  pastorTitle: "Senior Pastor",
  pastorBio: "",
  pastorWelcome: "",
  wifeName: "",
  wifeTitle: "",
  wifeBio: "",
  wifeWelcome: "",
  otherLeaders: "",
  leadershipPhotos: "",
  leadershipApproved: false,

  programmes: "",
  serviceSchedule: "",
  specialEvents: "",
  programmePhotos: "",

  prayerDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  prayerStart: "05:30",
  prayerEnd: "06:30",
  timeZone: "Africa/Lagos",
  zoomUrl: "",
  zoomMeetingId: "",
  zoomPasscode: "",
  zoomVisibility: "members",
  publishPrayerSchedule: "yes",

  buildingPhotos: "",
  interiorPhotos: "",
  worshipPhotos: "",
  eventPhotos: "",
  churchLogo: "",
  brandColours: "",
  youtube: "",
  sermonVideos: "",
  livestream: "",
  mediaApproved: false,

  websitePurpose: "",
  targetAudience: "",
  importantInformation: "",
  desiredPages: ["Home", "About the Church", "Leadership", "Services"],
  features: ["Contact Form", "Google Maps Location"],
  inspirationWebsites: "",
  designPreferences: "",
  preferredColours: "",
  otherFeatures: "",

  respondentName: "",
  respondentRole: "",
  respondentEmail: "",
  respondentPhone: "",
  contactMethod: "WhatsApp",
  bestContactTime: "",
  additionalNotes: "",
  authorization: false,
};

const pageFields = [
  ["churchName", "yearEstablished", "address", "city", "state", "phone", "email", "vision", "mission"],
  ["pastorName", "pastorTitle"],
  ["serviceSchedule"],
  ["prayerDays", "prayerStart", "prayerEnd", "timeZone", "zoomVisibility", "publishPrayerSchedule"],
  [],
  ["websitePurpose", "targetAudience"],
  ["respondentName", "respondentRole", "respondentEmail", "authorization"],
];

const featuresList = [
  "Home", "About the Church", "Leadership", "Services",
  "Ministries", "Events Calendar", "Sermon Library",
  "YouTube Integration", "Livestream", "Prayer Request Form",
  "Contact Form", "Online Registration", "Giving and Donations",
  "Photo Gallery", "News and Announcements", "WhatsApp Contact",
  "Google Maps Location", "Members-Only Information",
];

const pagesList = [
  "Home", "About the Church", "Leadership", "Services",
  "Ministries", "Events", "Sermons", "Gallery", "Contact",
];

function Field({
  label,
  name,
  data,
  setData,
  type = "text",
  placeholder = "",
  required = false,
  textarea = false,
  hint = "",
}) {
  return (
    <div className="field">
      <label htmlFor={name}>
        {label}{required && <span className="required"> *</span>}
      </label>

      {hint && <small className="field-hint">{hint}</small>}

      {textarea ? (
        <textarea
          id={name}
          name={name}
          rows="4"
          value={data[name] || ""}
          placeholder={placeholder}
          required={required}
          onChange={(e) =>
            setData((previous) => ({
              ...previous,
              [name]: e.target.value,
            }))
          }
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={data[name] || ""}
          placeholder={placeholder}
          required={required}
          onChange={(e) =>
            setData((previous) => ({
              ...previous,
              [name]: e.target.value,
            }))
          }
        />
      )}
    </div>
  );
}

function SelectField({ label, name, data, setData, options }) {
  return (
    <div className="field">
      <label htmlFor={name}>{label}</label>
      <select
        id={name}
        name={name}
        value={data[name]}
        onChange={(e) =>
          setData((previous) => ({
            ...previous,
            [name]: e.target.value,
          }))
        }
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function ChoiceGrid({ label, options, selected, onChange }) {
  return (
    <fieldset className="choice-fieldset">
      <legend>{label}</legend>
      <div className="choice-grid">
        {options.map((option) => {
          const checked = selected.includes(option);

          return (
            <label
              className={`choice-card ${checked ? "selected" : ""}`}
              key={option}
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() => {
                  onChange(
                    checked
                      ? selected.filter((item) => item !== option)
                      : [...selected, option]
                  );
                }}
              />
              <span>{option}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

function CheckField({ label, checked, onChange }) {
  return (
    <label className="check-field">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span>{label}</span>
    </label>
  );
}

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="section-heading">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}

function ReviewGroup({ title, data, fields, onEdit }) {
  return (
    <section className="review-group">
      <div className="review-group-heading">
        <h3>{title}</h3>
        <button type="button" className="edit-button" onClick={onEdit}>
          Edit section
        </button>
      </div>

      <div className="review-list">
        {fields.map(([key, label]) => {
          const value = data[key];

          return (
            <div className="review-row" key={key}>
              <span>{label}</span>
              <strong>
                {Array.isArray(value)
                  ? value.join(", ") || "Not provided"
                  : typeof value === "boolean"
                    ? value ? "Confirmed" : "Not confirmed"
                    : value || "Not provided"}
              </strong>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default function App() {
  const [data, setData] = useState(initialData);
  const [currentStep, setCurrentStep] = useState(-1);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [submitError, setSubmitError] = useState("");

  const progress = currentStep < 0
    ? 0
    : Math.round(((currentStep + 1) / steps.length) * 100);

  function update(name, value) {
    setData((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => ({ ...previous, [name]: "" }));
  }

  function validateStep(step) {
    const nextErrors = {};

    for (const field of pageFields[step] || []) {
      const value = data[field];

      if (
        value === undefined ||
        value === null ||
        value === "" ||
        (Array.isArray(value) && value.length === 0) ||
        (typeof value === "boolean" && !value)
      ) {
        nextErrors[field] = "Please complete this required field.";
      }
    }

    if (step === 0 && data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (step === 6 && data.respondentEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.respondentEmail)) {
      nextErrors.respondentEmail = "Please enter a valid email address.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  }

  function nextStep(event) {
    event.preventDefault();

    if (currentStep >= 0 && currentStep < 7 && !validateStep(currentStep)) {
      return;
    }

    setCurrentStep((step) => Math.min(step + 1, 7));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function previousStep() {
    setCurrentStep((step) => Math.max(step - 1, -1));
    setErrors({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitError("");

    if (!validateStep(6)) {
      setCurrentStep(6);
      return;
    }

    if (status === "sending") return;

    setStatus("sending");

    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (key === "zoomPasscode") return;

      formData.append(
        key,
        Array.isArray(value) ? value.join(", ") : String(value ?? "")
      );
    });

    formData.append("_subject", "Covenant House Family — Website Discovery Questionnaire");

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (!response.ok) {
        throw new Error(
          "Submission was not accepted. Please check the form configuration and try again."
        );
      }

      setStatus("success");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      setStatus("error");
      setSubmitError(
        error.message ||
          "We couldn't submit your answers. Please check your connection and try again."
      );
    }
  }

  const renderField = (props) => (
    <div className={errors[props.name] ? "has-error" : ""}>
      <Field {...props} data={data} setData={setData} />
      {errors[props.name] && (
        <p className="error-message" role="alert">
          {errors[props.name]}
        </p>
      )}
    </div>
  );

  function renderSection() {
    switch (currentStep) {
      case 0:
        return (
          <>
            <SectionHeading
              eyebrow="SECTION 01"
              title="Church information"
              description="Let's begin with the foundations of your ministry."
            />

            {renderField({ label: "Official church name", name: "churchName", required: true })}
            <div className="form-grid">
              {renderField({ label: "Year established", name: "yearEstablished", type: "number", placeholder: "e.g. 2010" })}
              {renderField({ label: "Official telephone", name: "phone", type: "tel", placeholder: "+234..." , required: true})}
            </div>
            {renderField({ label: "Street address", name: "address", required: true })}
            <div className="form-grid">
              {renderField({ label: "City", name: "city", required: true })}
              {renderField({ label: "State", name: "state", required: true })}
            </div>
            <div className="form-grid">
              {renderField({ label: "Official email", name: "email", type: "email", required: true })}
              {renderField({ label: "Existing website", name: "existingWebsite", placeholder: "https://..." })}
            </div>
            {renderField({ label: "Social media links", name: "socialLinks", textarea: true, placeholder: "Instagram, Facebook, YouTube..." })}
            {renderField({ label: "Vision statement", name: "vision", textarea: true, required: true })}
            {renderField({ label: "Mission statement", name: "mission", textarea: true, required: true })}
            {renderField({ label: "Core beliefs and values", name: "beliefs", textarea: true })}
            {renderField({ label: "Brief history of the church", name: "history", textarea: true })}
            {renderField({ label: "What should visitors understand about your church?", name: "mainMessage", textarea: true })}
          </>
        );

      case 1:
        return (
          <>
            <SectionHeading eyebrow="SECTION 02" title="Church leadership" description="Help us introduce your leadership accurately and respectfully." />
            <div className="form-grid">
              {renderField({ label: "Senior pastor's full name", name: "pastorName", required: true })}
              {renderField({ label: "Official title", name: "pastorTitle", required: true })}
            </div>
            {renderField({ label: "Pastor's biography and ministry journey", name: "pastorBio", textarea: true })}
            {renderField({ label: "Welcome message from the pastor", name: "pastorWelcome", textarea: true })}
            <div className="section-divider" />
            <h3 className="subheading">Pastor's wife (if applicable)</h3>
            <div className="form-grid">
              {renderField({ label: "Full name", name: "wifeName" })}
              {renderField({ label: "Official title", name: "wifeTitle" })}
            </div>
            {renderField({ label: "Biography and ministry responsibilities", name: "wifeBio", textarea: true })}
            {renderField({ label: "Optional welcome message", name: "wifeWelcome", textarea: true })}
            {renderField({ label: "Other leaders and their roles", name: "otherLeaders", textarea: true })}
            {renderField({ label: "Approved leadership photo folder link", name: "leadershipPhotos", placeholder: "Google Drive or other file-sharing link" })}
            <CheckField label="Leadership names, titles, biographies and photographs have been approved for the intended website use." checked={data.leadershipApproved} onChange={(value) => update("leadershipApproved", value)} />
          </>
        );

      case 2:
        return (
          <>
            <SectionHeading eyebrow="SECTION 03" title="Services & programmes" description="Tell us how your church gathers, serves and connects with its community." />
            {renderField({ label: "Weekly service days and times", name: "serviceSchedule", textarea: true, required: true, placeholder: "Sunday service, midweek service..." })}
            {renderField({ label: "Ministries and recurring programmes", name: "programmes", textarea: true, placeholder: "Bible study, youth ministry, children’s ministry, outreach..." })}
            {renderField({ label: "Special events and annual programmes", name: "specialEvents", textarea: true })}
            {renderField({ label: "Programme and event photo folder link", name: "programmePhotos", placeholder: "Paste a sharing link" })}
            <p className="info-note">Please include programme names, descriptions, schedules and any details visitors should know. You can provide additional information in the final notes.</p>
          </>
        );

      case 3:
        return (
          <>
            <SectionHeading eyebrow="SECTION 04" title="Zoom prayer meetings" description="Confirm the details of your daily prayer meetings and how they should be shared." />
            <div className="prayer-card">
              <span className="prayer-label">PRELIMINARY SCHEDULE</span>
              <h3>Daily Zoom Prayer Meetings</h3>
              <p>Monday–Saturday · 5:30 AM–6:30 AM</p>
              <span className="prayer-timezone">West Africa Time (WAT)</span>
            </div>
            <ChoiceGrid label="Confirm meeting days" options={["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]} selected={data.prayerDays} onChange={(value) => update("prayerDays", value)} />
            <div className="form-grid">
              <div className={errors.prayerStart ? "has-error" : ""}>
                <Field label="Start time" name="prayerStart" type="time" data={data} setData={setData} required />
              </div>
              <div className={errors.prayerEnd ? "has-error" : ""}>
                <Field label="End time" name="prayerEnd" type="time" data={data} setData={setData} required />
              </div>
            </div>
            <SelectField label="Time zone" name="timeZone" data={data} setData={setData} options={[
              { label: "West Africa Time (Africa/Lagos)", value: "Africa/Lagos" },
              { label: "Other — specify in notes", value: "Other" },
            ]} />
            {renderField({ label: "Official Zoom meeting URL", name: "zoomUrl", type: "url", placeholder: "https://zoom.us/j/..." })}
            {renderField({ label: "Zoom meeting ID (if required)", name: "zoomMeetingId" })}
            {renderField({ label: "Zoom passcode (if required)", name: "zoomPasscode", hint: "Collected only for planning. It is excluded from this form's submission payload and must not be published without explicit approval." })}
            <SelectField label="Who should be able to access the joining link?" name="zoomVisibility" data={data} setData={setData} options={[
              { label: "Church members only", value: "members" },
              { label: "Publicly accessible", value: "public" },
              { label: "Not decided yet", value: "undecided" },
            ]} />
            <SelectField label="Should the prayer schedule appear on the public website?" name="publishPrayerSchedule" data={data} setData={setData} options={[
              { label: "Yes, schedule only", value: "yes" },
              { label: "Yes, including joining details (subject to approval)", value: "approved-details" },
              { label: "No", value: "no" },
            ]} />
            <p className="warning-note">Zoom joining details can be sensitive. Confirm access permissions before publishing any link, meeting ID or passcode.</p>
          </>
        );

      case 4:
        return (
          <>
            <SectionHeading eyebrow="SECTION 05" title="Photos & media" description="Help us identify the official images and media that represent your church." />
            {renderField({ label: "Church exterior and building photo folder", name: "buildingPhotos", placeholder: "Paste a shared folder link" })}
            {renderField({ label: "Church interior photos", name: "interiorPhotos", placeholder: "Paste a shared folder link" })}
            {renderField({ label: "Pastor and leadership portraits", name: "leadershipPhotos", placeholder: "Paste a shared folder link" })}
            {renderField({ label: "Worship and congregation photos", name: "worshipPhotos", placeholder: "Paste a shared folder link" })}
            {renderField({ label: "Programme and conference photos", name: "eventPhotos", placeholder: "Paste a shared folder link" })}
            {renderField({ label: "Church logo link", name: "churchLogo", placeholder: "Link to the original logo file" })}
            {renderField({ label: "Official brand colours", name: "brandColours", placeholder: "If known" })}
            {renderField({ label: "Official YouTube channel", name: "youtube", placeholder: "https://youtube.com/..." })}
            {renderField({ label: "Sermon video or playlist links", name: "sermonVideos", textarea: true })}
            {renderField({ label: "Livestream link", name: "livestream", placeholder: "YouTube, Facebook or other official link" })}
            <CheckField label="The church has permission to share the supplied media for the intended website, including consent where needed." checked={data.mediaApproved} onChange={(value) => update("mediaApproved", value)} />
            <p className="info-note">This form accepts links to shared media folders. It does not upload files directly.</p>
          </>
        );

      case 5:
        return (
          <>
            <SectionHeading eyebrow="SECTION 06" title="Website goals & features" description="Let's plan a digital experience that serves your church and its visitors." />
            {renderField({ label: "Main purpose of the website", name: "websitePurpose", textarea: true, required: true })}
            {renderField({ label: "Who is the website intended to serve?", name: "targetAudience", textarea: true, required: true })}
            {renderField({ label: "What information should visitors find first?", name: "importantInformation", textarea: true })}
            <ChoiceGrid label="Preferred website pages" options={pagesList} selected={data.desiredPages} onChange={(value) => update("desiredPages", value)} />
            <ChoiceGrid label="Features you may want" options={featuresList} selected={data.features} onChange={(value) => update("features", value)} />
            {renderField({ label: "Other features", name: "otherFeatures", textarea: true })}
            {renderField({ label: "Websites you admire and why", name: "inspirationWebsites", textarea: true, placeholder: "Paste links and describe what you like" })}
            {renderField({ label: "Design preferences", name: "designPreferences", textarea: true })}
            <div className="form-grid">
              {renderField({ label: "Preferred colours", name: "preferredColours" })}
            </div>
          </>
        );

      case 6:
        return (
          <>
            <SectionHeading eyebrow="SECTION 07" title="Contact information" description="Tell us who is completing this questionnaire so we can follow up." />
            <div className="form-grid">
              {renderField({ label: "Your full name", name: "respondentName", required: true })}
              {renderField({ label: "Your role in the church", name: "respondentRole", required: true })}
            </div>
            <div className="form-grid">
              {renderField({ label: "Your email address", name: "respondentEmail", type: "email", required: true })}
              {renderField({ label: "Your phone / WhatsApp", name: "respondentPhone", type: "tel" })}
            </div>
            <SelectField label="Preferred contact method" name="contactMethod" data={data} setData={setData} options={[
              { label: "WhatsApp", value: "WhatsApp" },
              { label: "Phone call", value: "Phone" },
              { label: "Email", value: "Email" },
            ]} />
            {renderField({ label: "Best time to contact you", name: "bestContactTime", placeholder: "e.g. Weekdays after 4 PM" })}
            {renderField({ label: "Additional notes or instructions", name: "additionalNotes", textarea: true })}
            <div className="authorization-box">
              <CheckField label="I am authorized to provide this information and confirm that appropriate permissions have been obtained for materials intended for the website." checked={data.authorization} onChange={(value) => update("authorization", value)} />
              {errors.authorization && <p className="error-message">{errors.authorization}</p>}
            </div>
          </>
        );

      case 7:
        return (
          <>
            <SectionHeading eyebrow="FINAL STEP" title="Review your answers" description="Please review your responses before sending them to RAY DIGITAL." />
            <p className="info-note">Use the Edit section buttons to return to any section and make changes.</p>
            <ReviewGroup title="Church information" data={data} onEdit={() => setCurrentStep(0)} fields={[
              ["churchName", "Church name"], ["yearEstablished", "Year established"],
              ["address", "Address"], ["city", "City"], ["state", "State"],
              ["phone", "Church phone"], ["email", "Church email"],
              ["vision", "Vision"], ["mission", "Mission"],
            ]} />
            <ReviewGroup title="Leadership" data={data} onEdit={() => setCurrentStep(1)} fields={[
              ["pastorName", "Senior pastor"], ["pastorTitle", "Pastor's title"],
              ["pastorBio", "Pastor biography"], ["wifeName", "Pastor's wife"],
              ["otherLeaders", "Other leaders"],
            ]} />
            <ReviewGroup title="Services & programmes" data={data} onEdit={() => setCurrentStep(2)} fields={[
              ["serviceSchedule", "Weekly schedule"], ["programmes", "Programmes"],
              ["specialEvents", "Special events"],
            ]} />
            <ReviewGroup title="Zoom prayer" data={data} onEdit={() => setCurrentStep(3)} fields={[
              ["prayerDays", "Prayer days"], ["prayerStart", "Start time"],
              ["prayerEnd", "End time"], ["timeZone", "Time zone"],
              ["zoomVisibility", "Link access"], ["publishPrayerSchedule", "Publish schedule"],
            ]} />
            <ReviewGroup title="Church media" data={data} onEdit={() => setCurrentStep(4)} fields={[
              ["buildingPhotos", "Building photos"], ["interiorPhotos", "Interior photos"],
              ["churchLogo", "Church logo"], ["youtube", "YouTube"],
              ["livestream", "Livestream"],
            ]} />
            <ReviewGroup title="Website goals" data={data} onEdit={() => setCurrentStep(5)} fields={[
              ["websitePurpose", "Purpose"], ["targetAudience", "Audience"],
              ["desiredPages", "Preferred pages"], ["features", "Features"],
            ]} />
            <ReviewGroup title="Contact" data={data} onEdit={() => setCurrentStep(6)} fields={[
              ["respondentName", "Name"], ["respondentRole", "Role"],
              ["respondentEmail", "Email"], ["contactMethod", "Contact method"],
              ["authorization", "Authorization"],
            ]} />
            <div className="privacy-note">
              Your responses are sent to the configured form endpoint. The Zoom passcode is not included in the submission.
            </div>
          </>
        );

      default:
        return null;
    }
  }

  if (status === "success") {
    return (
      <main className="success-screen">
        <div className="success-card">
          <div className="success-icon">✓</div>
          <span className="eyebrow">SUBMISSION RECEIVED</span>
          <h1>Thank you for sharing your vision.</h1>
          <p>Your questionnaire was accepted by the submission service. The information will help us plan the Covenant House Family website.</p>
          <p className="success-brand">Prepared by RAY DIGITAL</p>
        </div>
      </main>
    );
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand-mark" href="#top" aria-label="Covenant House Family">
          <span className="brand-symbol">✦</span>
          <span className="brand-name">COVENANT HOUSE <small>FAMILY</small></span>
        </a>
        <span className="topbar-caption">WEBSITE DISCOVERY</span>
      </header>

      <main id="top" className="main-content">
        {currentStep === -1 ? (
          <section className="welcome-layout">
            <div className="welcome-copy">
              <span className="eyebrow">A NEW DIGITAL CHAPTER</span>
              <h1>Let's build a <span>digital home</span> for your ministry.</h1>
              <p className="welcome-description">
                Help us understand your church, your vision, your community,
                and the experience you want to create online.
              </p>
              <div className="welcome-meta">
                <span>✦ Thoughtful planning</span>
                <span>✦ Your ministry, your vision</span>
              </div>
              <button className="primary-button" type="button" onClick={() => setCurrentStep(0)}>
                Begin questionnaire <span aria-hidden="true">→</span>
              </button>
              <p className="welcome-time">Approximately 10–15 minutes</p>
            </div>
            <aside className="welcome-panel">
              <div className="cross-mark" aria-hidden="true">✝</div>
              <span className="panel-kicker">COVENANT HOUSE FAMILY</span>
              <h2>Every ministry has a story worth sharing.</h2>
              <div className="panel-line" />
              <p>This discovery process helps us understand the heart of your church before planning its website.</p>
              <span className="panel-reference">A DIGITAL DISCOVERY EXPERIENCE</span>
            </aside>
          </section>
        ) : (
          <>
            <div className="page-intro">
              <span className="eyebrow">COVENANT HOUSE FAMILY</span>
              <h1>Website discovery</h1>
              <p>Share the details that will help us plan your church website.</p>
            </div>

            <div className="form-layout">
              <aside className="form-sidebar">
                <span className="sidebar-label">YOUR PROGRESS</span>
                <div className="sidebar-progress">
                  <div style={{ width: `${progress}%` }} />
                </div>
                <span className="sidebar-percent">{progress}% completed</span>
                <nav className="sidebar-steps" aria-label="Questionnaire sections">
                  {steps.map((step, index) => (
                    <button
                      key={step}
                      type="button"
                      onClick={() => {
                        if (index < currentStep) {
                          setCurrentStep(index);
                          setErrors({});
                        }
                      }}
                      disabled={index >= currentStep}
                      className={`sidebar-step ${index === currentStep ? "active" : ""} ${index < currentStep ? "complete" : ""}`}
                    >
                      <span className="sidebar-step-number">{index < currentStep ? "✓" : `0${index + 1}`}</span>
                      <span>{step}</span>
                    </button>
                  ))}
                </nav>
                <div className="sidebar-help">
                  <span>NEED HELP?</span>
                  <p>If you are unsure about an answer, you can add more details in the final notes.</p>
                </div>
              </aside>

              <form className="questionnaire-card" onSubmit={currentStep === 7 ? handleSubmit : nextStep}>
                <div className="card-topline">
                  <span>STEP {currentStep + 1} OF {steps.length}</span>
                  <span>✦ RAY DIGITAL</span>
                </div>

                {renderSection()}

                {submitError && (
                  <div className="submission-error" role="alert">
                    <strong>Submission unsuccessful</strong>
                    <p>{submitError}</p>
                    <p>Your answers remain on this page. You can try submitting again.</p>
                  </div>
                )}

                {status === "error" && (
                  <button className="secondary-button retry-button" type="button" onClick={() => setStatus("idle")}>
                    Try again
                  </button>
                )}

                <div className="form-actions">
                  <button
                    type="button"
                    className="secondary-button"
                    onClick={previousStep}
                    disabled={currentStep === 0 || status === "sending"}
                  >
                    ← Back
                  </button>

                  {currentStep < 7 ? (
                    <button className="primary-button" type="submit">
                      Continue <span aria-hidden="true">→</span>
                    </button>
                  ) : (
                    <button className="primary-button" type="submit" disabled={status === "sending"}>
                      {status === "sending" ? "Submitting..." : "Submit questionnaire"}
                      <span aria-hidden="true">{status === "sending" ? "…" : "→"}</span>
                    </button>
                  )}
                </div>
              </form>
            </div>
          </>
        )}
      </main>

      <footer className="site-footer">
        <div>
          <span className="footer-brand">RAY DIGITAL<span> ⚡</span></span>
          <p>Thoughtful digital experiences for meaningful work.</p>
        </div>
        <span className="footer-copyright">COVENANT HOUSE FAMILY · WEBSITE DISCOVERY</span>
      </footer>
    </div>
  );
}