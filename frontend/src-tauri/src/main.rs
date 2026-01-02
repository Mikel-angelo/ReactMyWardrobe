 #![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::process::{Command, Child};
use std::sync::Mutex;
use tauri::{Manager, RunEvent};

static BACKEND: Mutex<Option<Child>> = Mutex::new(None);

fn kill_backend() {
    if let Some(mut child) = BACKEND.lock().unwrap().take() {
        let _ = child.kill();
        let _ = child.wait(); // 🔥 CRITICAL: guarantees port release
    }
}

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            let resource_dir = app.path().resource_dir().expect("resource dir");
            let backend_path = resource_dir.join("resources").join("backend.exe");

            let child = Command::new(&backend_path)
                .spawn()
                .expect("failed to start backend");

            *BACKEND.lock().unwrap() = Some(child);
            Ok(())
        })
        .on_window_event(|_, event| {
            if let tauri::WindowEvent::CloseRequested { .. } = event {
                kill_backend();
            }
        })
        .run(tauri::generate_context!(), |_, event| {
            if let RunEvent::Exit = event {
                kill_backend();
            }
        });
}