export interface IProgressDisplayProps {
  progress: number;
}

const ProgressDisplay: React.FunctionComponent<IProgressDisplayProps> = ({ progress }: IProgressDisplayProps) => {
  return (
    <div className="progress-display">
      <div className="progress-bar">
        <div style={{ width: progress + '%' }} className="progress-indicator"></div>
      </div>
    </div>
  );
};

export default ProgressDisplay;
