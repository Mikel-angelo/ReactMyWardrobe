// #![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::process::{Command, Child};
use std::sync::Mutex;
use tauri::Manager;

static BACKEND: Mutex<Option<Child>> = Mutex::new(None);

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            let resource_dir = app.path().resource_dir().expect("resource dir");
            let backend_path = resource_dir.join("resources").join("backend.exe");


            // DEBUG PRINT (will show in console)
            eprintln!("RESOURCE DIR: {:?}", resource_dir);
            eprintln!("BACKEND PATH: {:?}", backend_path);
            eprintln!("BACKEND EXISTS: {}", backend_path.exists());

            let child = Command::new(&backend_path)
                .spawn()
                .expect("failed to start backend");

            *BACKEND.lock().unwrap() = Some(child);

            Ok(())
        })
        .on_window_event(|_window, event| {
            if let tauri::WindowEvent::CloseRequested { .. } = event {
                if let Some(mut child) = BACKEND.lock().unwrap().take() {
                    let _ = child.kill();
                }
            }
        })
        .run(tauri::generate_context!())
        .expect("tauri error");
}
