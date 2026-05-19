export default function SuccessModal ({ show, message, onClose }) {

    if (!show) return null;

    return (
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">

                    <div className="modal-header text-bg-success">
                        <i class="bi bi-check-circle-fill me-2"></i>
                        <h5 className="modal-title">SUCESSO</h5>
                        <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
                    </div>

                    <div className="modal-body">
                        <p>{message}</p>
                    </div>

                    <div className="modal-footer justify-content-center">
                        <button className="btn btn-success" onClick={onClose}>OK</button>
                    </div>

                </div>
            </div>
        </div>
    );
}