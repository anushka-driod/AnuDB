import ProfileSettings from "../../components/settings/ProfileSettings";
import SecuritySettings from "../../components/settings/SecuritySettings";
import Preferences from "../../components/settings/Preferences";
import DangerZone from "../../components/settings/DangerZone";


export default function Settings() {

  return (

    <div className="settings-page">

      <div className="page-header">

        <div>

          <h1>Settings</h1>

          <p>
            Manage your account and application settings.
          </p>

        </div>

      </div>

      <ProfileSettings />

      <SecuritySettings />

      <Preferences />

      <DangerZone />

    </div>

  );

}