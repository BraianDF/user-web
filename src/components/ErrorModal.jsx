export default function ErrorModal({ show, message, onClose }) {

    if (!show) return null;

    return (
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">

                    <div className="modal-header text-bg-danger">
                        <i class="bi bi-exclamation-triangle-fill me-2"></i>
                        <h5 className="modal-title">ERRO</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>

                    <div className="modal-body">
                        <p>{message}</p>
                    </div>

                    <div className="modal-footer justify-content-center">
                        <button className="btn btn-danger" onClick={onClose}>Fechar</button>
                    </div>

                </div>
            </div>
        </div>
    );
}