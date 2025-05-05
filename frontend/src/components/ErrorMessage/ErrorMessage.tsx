import styles from './css/ErrorMessage.module.scss';

export enum Errors {
  LoginValidation = "LoginValidation",
  ServerError = "ServerError",
  TagAlreadyExist = "TagAlreadyExist",
  TagsLimitReached = "TagLimitReached",
  TagNameIsMissing = "TagNameIsMissing",
  NoTagSettingsActionDefined = "NoTagSettingsActionDefined",
}

export const errorTexts: Record<Errors, string> = {
  [Errors.LoginValidation]: "Username or password is invalid.",
  [Errors.ServerError]: "This action couldn't be done due to server issues.",
  [Errors.TagAlreadyExist]: "This name is already used in an existing tag.",
  [Errors.TagsLimitReached]: "You have already reached the tag quantity limit",
  [Errors.TagNameIsMissing]: "Add a name to the tag before confirm.",
  [Errors.NoTagSettingsActionDefined]: "Add a name to a new  tag or select a created tag to delete before confirm.",
}

interface Props {
  category: Errors,
}

const ErrorMessage: React.FC<Props> = ({category}) => {
  const errorIconPath = "/OtherIcons/error-icon.png";

  return (
    <div className={styles.errorContainer}>
      <img src={errorIconPath} alt="Error-icon" />
      <p>{errorTexts[category]}</p>
    </div>
  )
}

export default ErrorMessage;